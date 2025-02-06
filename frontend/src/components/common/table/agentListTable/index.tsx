import React, { useCallback, useMemo, useState } from 'react';
import styles from '@/components/common/table/agentListTable/AgentListTable.module.scss';
import classNames from 'classnames/bind';
import ArrowLeftIcon from '@/public/icon/arrow-left-icon.svg';
import ArrowRightIcon from '@/public/icon/arrow-right-icon.svg';
import DoubleArrowLeftIcon from '@/public/icon/double-arrow-left-icon.svg';
import DoubleArrowRightIcon from '@/public/icon/double-arrow-right-icon.svg';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/api';
import { getAllAgents } from '@/shared/api/agent/api';
import { AllAgentItem } from '@/shared/types/data/agent.type';
import { fetchRelatedTimeDay, fetchUpdatedTime } from '@/shared/utils/date';
import {
  formatPrice,
  formatSignPercentage,
  formatSignPrice,
} from '@/shared/utils/price';
import { useRouter } from 'next/navigation';
import SortTableButton from '@/components/common/button/sortTableButton';
import { AgentSortType } from '@/shared/types/data/api.type';

const cx = classNames.bind(styles);

const AgentListTable = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sort, setSort] = useState<AgentSortType>('totalPnL');
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_AGENT, sort, sortOrder],
    queryFn: () => getAllAgents({ page, pageSize: 14, sort, sortOrder }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className={cx('table-container')}>
      <div className={cx('table-label-wrapper')}>
        <div className={cx('table-controller')}>
          <button aria-label="move-to-first" className={cx('button')} disabled>
            <DoubleArrowLeftIcon viewBox="0 0 24 25" className={cx('icon')} />
          </button>
          <button aria-label="move-to-prev" className={cx('button')} disabled>
            <ArrowLeftIcon viewBox="0 0 24 25" className={cx('icon')} />
          </button>
          <span className={cx('page-text')}>Page {page}</span>
          <button aria-label="move-to-next" className={cx('button')} disabled>
            <ArrowRightIcon viewBox="0 0 24 25" className={cx('icon')} />
          </button>
          <button aria-label="move-to-last" className={cx('button')} disabled>
            <DoubleArrowRightIcon viewBox="0 0 24 25" className={cx('icon')} />
          </button>
        </div>
      </div>
      <div className={cx('table-wrapper')}>
        <table className={cx('table')}>
          <thead className={cx('table-header')}>
            <tr className={cx('tr')}>
              <th className={cx('th')}>Agent</th>
              <th className={cx('th')}>
                <SortTableButton
                  text={'NAV'}
                  asc={() => {
                    setSort('nav');
                    setSortOrder('asc');
                  }}
                  desc={() => {
                    setSort('nav');
                    setSortOrder('desc');
                  }}
                />
              </th>
              <th className={cx('th')}>
                <SortTableButton
                  text={'Realized'}
                  asc={() => {
                    setSort('realized');
                    setSortOrder('asc');
                  }}
                  desc={() => {
                    setSort('realized');
                    setSortOrder('desc');
                  }}
                />
              </th>
              <th className={cx('th')}>
                <SortTableButton
                  text={'Unrealized'}
                  asc={() => {
                    setSort('unrealized');
                    setSortOrder('asc');
                  }}
                  desc={() => {
                    setSort('unrealized');
                    setSortOrder('desc');
                  }}
                />
              </th>
              <th className={cx('th')}>
                <SortTableButton
                  text={'Total PnL'}
                  asc={() => {
                    setSort('totalPnL');
                    setSortOrder('asc');
                  }}
                  desc={() => {
                    setSort('totalPnL');
                    setSortOrder('desc');
                  }}
                />
              </th>
              <th className={cx('th')}>
                <SortTableButton
                  text={'Age'}
                  asc={() => {
                    setSort('age');
                    setSortOrder('asc');
                  }}
                  desc={() => {
                    setSort('age');
                    setSortOrder('desc');
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody className={cx('table-body')}>
            {isLoading ? (
              <tr className={cx('tr-loading')}>
                <td className={cx('td')}>Loading...</td>
              </tr>
            ) : (
              data?.results?.map((item: AllAgentItem, index: number) => {
                const isLast = index === data.totalCount;
                return (
                  <tr
                    key={item.fundId}
                    className={cx('tr', { isLast })}
                    onClick={() =>
                      router.push(`/agent/${item.fundId}?name=${item.name}`)
                    }
                  >
                    <td className={cx('td', 'name')}>{item.name}</td>
                    <td className={cx('td')}>
                      ${formatPrice(item.nav?.toFixed(2))}
                    </td>
                    <td
                      className={cx('td', {
                        isPlus: item?.realizedProfit > 0,
                        isMinus: item?.realizedProfit < 0,
                      })}
                    >
                      {formatSignPrice(item.realizedProfit?.toFixed(2))}
                    </td>
                    <td
                      className={cx('td', {
                        isPlus: item?.unrealizedProfit > 0,
                        isMinus: item?.unrealizedProfit < 0,
                      })}
                    >
                      {formatSignPrice(item.unrealizedProfit?.toFixed(2))}
                    </td>
                    <td
                      className={cx('td', {
                        isPlus: item?.totalPnL > 0,
                        isMinus: item?.totalPnL < 0,
                      })}
                    >
                      {formatSignPercentage(item.totalPnL?.toFixed(2))}
                    </td>
                    <td className={cx('td', 'date')}>
                      {fetchRelatedTimeDay(item.createdAt, true)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className={cx('update-time-wrapper')}>
        <span className={cx('update-time-text')}>
          updates every 1 hour / last updated
          {` ${fetchUpdatedTime(new Date().toString())}`}
        </span>
        <span className={cx('total-text')}>
          Total {data?.totalCount ?? '-'}
          <span className={cx('name-text')}>agents</span>
        </span>
      </div>
    </div>
  );
};

export default AgentListTable;
