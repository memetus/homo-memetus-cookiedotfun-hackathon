import { AllAgentType } from '@/shared/types/data/agent.type';
import { GetAllAgentParams } from '@/shared/types/data/api.type';
import { HoldingsTokenQueryType } from '@/shared/types/data/portfolio';
import axios from 'axios';

export const getAllAgents = async ({
  page,
  pageSize,
  sort,
  sortOrder,
}: GetAllAgentParams) => {
  try {
    const response = await axios.get(
      `/api/agent-data/agent-dashboard?sortOrder=${sortOrder}&sort=${sort}&page=${page}&pageSize=${pageSize}`,
    );

    if (response.status === 200) {
      return response.data as AllAgentType;
    }

    throw new Error('Failed to fetch agents');
  } catch (error) {
    console.log(
      new Error((error as Error).message || 'Unexpected error occurred'),
    );

    return null;
  }
};

export const getAgentMetadata = async (id: string) => {
  try {
    const response = await axios.get(`/api/agent-data/agent-metadata/${id}`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Failed to fetch agent metadata');
  } catch (error) {
    console.log(
      new Error((error as Error).message || 'Unexpected error occurred'),
    );

    return null;
  }
};

export const getAgentStat = async (id: string) => {
  try {
    const response = await axios.get(`/api/agent-data/agent-stat/${id}`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Failed to fetch agent stat');
  } catch (error) {
    console.log(
      new Error((error as Error).message || 'Unexpected error occurred'),
    );

    return null;
  }
};

export const getAgentHolding = async (
  id: string,
  page: number,
  sort: HoldingsTokenQueryType,
  sortOrder: 'asc' | 'desc',
) => {
  try {
    const response = await axios.get(
      `/api/agent-data/portfolio/holdings/${id}?sort=${sort}&sortOrder=${sortOrder}&page=${page}&pageSize=10`,
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Failed to fetch agent holding');
  } catch (error) {
    console.log(
      new Error((error as Error).message || 'Unexpected error occurred'),
    );

    return [];
  }
};

export const getAgentActivity = async (id: string, page: number) => {
  try {
    const response = await axios.get(
      `/api/agent-data/portfolio/activity/${id}?page=${page}&pageSize=10`,
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Failed to fetch agent activity');
  } catch (error) {
    console.log(
      new Error((error as Error).message || 'Unexpected error occurred'),
    );

    return [];
  }
};
