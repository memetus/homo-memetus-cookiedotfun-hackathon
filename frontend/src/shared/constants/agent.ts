export const promptAgentTemplate = `
  Generate a short-term memecoin investment strategy based on the user’s input. 
  If the user's input is unrelated to memecoin investment, request a relevant prompt instead. 
  The response should be concise (under 200 words) and avoid mentioning specific prices or memecoin names.
  If the user attempts to engage in a conversation about other topics, you must decline the discussion.

  You must never miss the keywords and concepts listed below from the user's prompt. 
  When creating a strategy, you must mention them without fail.

  **Keywords and Concepts:**
  - cookiedotfun
  - aiagent
  - defai
  - infrastructure

  Do not request or require additional information from the user. 
  Only when you determine the user's intent is unrelated to memecoin investment should you prompt for a new input.
  `;

export const promptStrategy = `
**1. Definition and Characteristics**

**1.1 Definition and Fundamental Characteristics**

Quantitative investment represents a systematic approach to financial markets that employs mathematical models, statistical analysis, and computational algorithms to identify and exploit market opportunities. At its core, quantitative investment (or "quant" investment) operates on the principle that markets exhibit certain patterns and inefficiencies that can be systematically captured through rigorous mathematical and statistical methods.

The foundation of quantitative investment rests on several key principles:

**1.1.1 Data-Driven Decision Making**

Quantitative investment strategies rely exclusively on empirical evidence derived from historical market data, fundamental indicators, and alternative data sources. This approach eliminates emotional bias and ensures investment decisions are based on statistically significant patterns rather than intuition or market sentiment.

**1.1.2 Systematic Execution**

All investment decisions follow pre-defined rules and algorithms. These rules are:

- Explicitly coded into computer programs
- Based on mathematical models
- Executed automatically when specific conditions are met
- Continuously monitored and adjusted based on performance metrics

**1.1.3 Scalability and Efficiency**

Modern quantitative investment systems can:

- Analyze thousands of securities simultaneously
- Execute trades across multiple markets
- Maintain precise position sizing
- Implement complex risk management protocols

**1.1.4 Factor-Based Analysis**

The cornerstone of many quantitative strategies is factor investing, which identifies specific characteristics (factors) that explain and predict asset returns. 

**1.2 Factor Types and Their Applications**

A factor can be simply defined as the common characteristics of well-performing stocks. When investors naturally wonder about which stocks perform well, many experts began researching the common patterns among stocks with good returns. Factor Investing aims to capture hidden returns in financial markets. It represents the most rational form of investment based on statistics rather than individual stock selection.

**1.2.1 Size Factor**

The Size Factor, which emerged from observing that small-cap stocks tend to outperform large-cap stocks, can be defined as a risk premium related to company size. While size factor profitability has been discovered in many stock markets, it has limitations: high performance volatility and the fact that size premium is mostly found in micro-cap stocks. Therefore, it is recommended to apply this factor in conjunction with other factors.

**1.2.2 Value Factor**

The Value Factor embodies the basic principle of buying low and selling high as a quantifiable factor. Metrics like PBR (Price-to-Book Ratio), PER (Price-to-Earnings Ratio) all belong to value factors. Rather than simply selecting stocks with low prices, it quantitatively represents the strategy of identifying undervalued stocks that can outperform market returns over long periods. The types of value factors vary depending on how corporate value is measured, including PBR, PER, and PCR.

**1.2.3 Quality Factor**

The Quality Factor serves as a criterion for identifying high-quality companies. While quality analysis traditionally considered factors like management integrity, corporate governance, and market positioning from a value investor's perspective, recent investment approaches focus primarily on financial statement indicators such as return on equity or free cash flow. The Quality Factor gained significant attention after the 2001 US Enron incident. When companies that appeared to be transitioning to low growth manipulated their accounts and increased debt, leading to dramatic bankruptcies, investors began focusing on companies' financial statements rather than stock prices. While Quality Factor often aligns with Value Factor, it differs in its focus on blue-chip stocks among undervalued companies. Therefore, it can be strategically combined with the Value Factor to identify undervalued, high-quality stocks.

**1.2.4 Momentum Factor**

Stocks generally tend to maintain their recent price trends. The Momentum Factor was developed to study and utilize this phenomenon. While short-term momentum following current trends is one of the most reliable sources of returns, it faces two key challenges. First, since it selects stocks that are sensitive to market conditions in bull markets, there's a risk of sudden reversal when market breaks occur. Second, the strongest performing stock groups change constantly, making frequent portfolio adjustments cumbersome. If this leads to excessive buying and selling, transaction costs may offset momentum returns. Momentum Factor is broadly classified into two types: Relative Momentum, which involves buying stocks that have shown the highest recent price increases, and Absolute Momentum, which involves investing during bull markets and converting to cash during bear markets. Strategy performance varies depending on how bull and bear markets are distinguished. When using momentum strategies, it's crucial to understand the risks of trend reversal and how these risks can be mitigated.

**1.3 Asset allocation**

**1.3.1 Asset Allocation Fundamentals**

Asset allocation represents the cornerstone of portfolio management, determining how investments are distributed across different asset classes to optimize risk-adjusted returns. Research has demonstrated that asset allocation explains approximately 93.6% of quarterly return variations in investment portfolios, making it the most crucial factor in long-term investment success.

**1.3.2 Strategic Importance**

Asset allocation's significance stems from its ability to:

- Manage portfolio risk through diversification
- Create sustainable long-term returns
- Provide a systematic approach to investment management
- Reduce emotional decision-making in investing

**1.3.3 Asset Allocation Models**

The implementation of asset allocation typically follows several established models:

**Strategic Asset Allocation (SAA)**

- Long-term approach (5-10 years horizon)
- Based on predetermined asset class weights
- Regular rebalancing to maintain target allocations
- Focus on risk tolerance and investment objectives

**Tactical Asset Allocation (TAA)**

- Short-term deviations from strategic allocation
- Capitalizes on market opportunities
- Requires active management and market timing
- Higher transaction costs but potential for enhanced returns

**1.4 Maximum Drawdown Analysis**

Maximum Drawdown (MDD) serves as a crucial risk metric that measures the largest peak-to-trough decline in portfolio value before a new peak is established. This metric is essential for understanding potential downside risk and portfolio resilience.

**1.4.1 Mathematical Framework**

The MDD calculation follows the formula:

MDD=Trough Value−Peak ValuePeak Value×100%

**1.4.2 Implementation Considerations**

**Risk Assessment Applications**

- Portfolio stress testing
- Strategy comparison
- Risk tolerance evaluation
- Performance attribution analysis

**Practical Implementation**

1. Continuous monitoring of portfolio values
2. Identification of peak and trough points
3. Regular calculation of drawdown metrics
4. Implementation of risk management protocols

**1.5 Risk Management Strategy**

**1.5.1 Portfolio Construction**

- Asset class selection based on correlation analysis
- Weight optimization using modern portfolio theory
- Risk budget allocation across asset classes

**1.5.2 Risk Monitoring**

- Continuous tracking of portfolio drawdowns
- Regular rebalancing triggers
- Performance attribution analysis

**1.5.3 Risk Mitigation**

- Dynamic asset allocation adjustments
- Implementation of stop-loss strategies
- Hedging techniques during market stress

**1.6 Practical Applications and Considerations**

**1.6.1 Portfolio Optimization Process**

1. **Initial Portfolio Construction**
    - Define investment objectives
    - Establish risk tolerance levels
    - Select appropriate asset classes
    - Determine target allocations
2. **Ongoing Management**
    - Monitor portfolio performance
    - Track drawdown metrics
    - Implement rebalancing strategies
    - Adjust allocations based on market conditions

**1.6.2 Risk Management Implementation**

1. **Drawdown Control**
    - Set maximum drawdown limits
    - Implement stop-loss orders
    - Use options for portfolio protection
    - Maintain cash reserves for opportunities
2. **Performance Monitoring**
    - Track rolling drawdown metrics
    - Compare against benchmarks
    - Analyze recovery periods
    - Assess risk-adjusted returns

**2. Quantitative Crypto Trading Strategies**

**2.1 Fundamental Strategy Framework**

**2.1.1 Introduction to Crypto Quantitative Trading**

Quantitative trading in cryptocurrency markets requires a unique approach that combines traditional momentum strategies with crypto-specific indicators. This comprehensive guide outlines a complete framework for implementing automated trading strategies in the crypto market, specifically focused on altcoins and meme tokens.

**2.1.2 Momentum Strategy Implementation**

**1. Returns-Based Momentum**

The foundation of crypto momentum trading involves identifying assets with strong price appreciation patterns. For cryptocurrency markets, we implement this through:

- Short-term momentum (24-72 hours)
- Medium-term momentum (7-30 days)
- Long-term momentum (30-90 days)

Implementation steps:

1. Calculate rolling returns across multiple timeframes
2. Normalize returns by volatility
3. Rank assets based on risk-adjusted momentum scores
4. Filter out tokens with insufficient liquidity

**2. Volume-Weighted Momentum**

For DEX-traded tokens, volume analysis is crucial:

- Calculate volume-weighted average price (VWAP)
- Monitor liquidity pool depth changes
- Analyze trading volume relative to market cap
- Track unique wallet interactions

**3. Cross-sectional Momentum**

Compare performance across:

- Similar market cap ranges
- Same blockchain ecosystems
- Comparable token utilities
- Similar trading pairs
1. **Price Momentum Strategy**
    1. **Technical Indicators**
    - Use dual moving averages (13-period and 26-period)
    - Enter long when 13-period crosses above 26-period
    - Exit when 13-period crosses below 26-period
    - Confirm with RSI and volume indicators
    
    **b. Risk Management**
    
    - Set stop-loss at 2 ATR below entry
    - Trail stops as profit develops
    - Maximum position size: 2% of portfolio
    - Scale out at predetermined profit targets
2. **Volume Momentum Strategy**
    - Monitor volume/liquidity ratio (VLR)
    - Healthy VLR range: 0.1-0.5
    - Suspicious activity: VLR > 1.0
    - Combine with price action confirmation
3. **Bollinger Bands Implementation**
    1. **Band Construction**
- Calculate 20-day moving average
- Set upper/lower bands at ±2 standard deviations
- Monitor band width for volatility assessment[26](https://www.lcx.com/how-to-use-bollinger-bands-in-crypto-trading/)
    
    **b. Trading Signals**
    
- Oversold: Price touches lower band
- Overbought: Price touches upper band
- Confirmation: Wait for price to move back inside bands
- Exit: When price crosses middle band[32](https://tiomarkets.com/en/article/mean-reversion-trading-strategy-your-ultimate-guide)

**2.1.3 Risk Management Framework**

**Position Sizing**

- Maximum 2-5% allocation per token
- Adjust based on liquidity metrics
- Scale positions based on volatility
- Consider correlation with BTC/ETH

**Stop-Loss Implementation**

- Dynamic stops based on ATR
- Trailing stops for trending markets
- Time-based exits for mean reversion
- Liquidity-based position reduction
1. **Crypto Market Analysis and Metrics Guide for Meme Tokens**

**3.1 Bitcoin Dominance Analysis**

**3.1.1 Understanding BTC Dominance**

Bitcoin dominance serves as a fundamental market sentiment indicator for timing altcoin and meme token investments. This metric represents Bitcoin's market capitalization as a percentage of the total cryptocurrency market capitalization. Understanding BTC.D movements is crucial for timing meme token entries and exits.

**3.1.2 Interpreting Dominance Cycles**

The crypto market typically moves through three distinct phases based on BTC dominance:

1. **High Dominance Phase (>65%)**During this phase, capital concentrates in Bitcoin, indicating:
- Risk-off sentiment in the broader crypto market
- Lower appetite for speculative meme tokens
- Potential accumulation period for future meme token rallies
- Recommended strategy: Reduce meme token exposure, build stable reserves
1. **Declining Dominance Phase (<50%)**This phase often signals the start of an "alt season":
- Capital flows from Bitcoin to alternative tokens
- Increased risk appetite in the market
- Higher probability of successful meme token launches
- Optimal period for meme token participation with strict risk management
1. **Range-bound Dominance (50-65%)**Represents a transitional market phase:
- Requires more selective meme token participation
- Focus on tokens with strong community engagement
- Monitor social media trends more actively
- Implementation of tighter stop-losses

**3.2 Correlation Analysis for Meme Tokens**

**3.2.1 Understanding Correlation Patterns**

Meme tokens exhibit unique correlation behaviors that can be exploited for trading opportunities:

1. **BTC-Meme Token Correlation**
- Strong positive correlation (>0.7) suggests market-wide momentum
- Negative correlation (<-0.3) often indicates potential breakout opportunities
- Zero correlation might signal independent price drivers (e.g., social media trends)
1. **Inter-Meme Token Correlation**
- High correlation between similar meme tokens suggests sector-wide moves
- Divergences can indicate potential leaders and laggards
- Monitor correlation breaks for potential trend changes

**3.3 Liquidity Analysis Framework**

**3.3.1 Understanding Liquidity Depth**

Liquidity depth in DEX pools is crucial for meme token trading success. Here's how to analyze it effectively:

1. **Base Liquidity Assessment**
- Calculate total value locked (TVL) in the pool
- Monitor liquidity distribution across price ranges
- Assess liquidity concentration points
- Example: A healthy meme token should have minimum $100,000 TVL with even distribution
1. **Liquidity Stability Metrics**
- Track liquidity provider (LP) concentration
- Monitor LP token lock periods
- Analyze liquidity removal patterns
- Red flags: Single LP holding >40% of pool or frequent large liquidity removals

**3.4 Volume Analysis Framework**

**3.4.1 Volume/Liquidity Ratio (VLR)**

This critical metric helps identify sustainable trading activity versus potential manipulation:

1. **Healthy VLR Ranges**
- 0.1-0.3: Normal trading activity
- 0.3-0.5: High interest but sustainable
- ***1.0: Potential manipulation or unsustainable activity***
1. **Volume Pattern Analysis**
- Compare volume across different time zones
- Monitor trade size distribution
- Track unique wallet interactions
- Ideal pattern: Consistent volume with diverse trader participation

**3.5 Network Value Metrics for Meme Tokens**

**3.5.1 NVT (Network Value to Transactions) Analysis**

1. **Basic NVT Interpretation**
- Low NVT (<50): Potentially undervalued
- High NVT (>150): Possible overvaluation
- Dynamic ranges based on market cycle
1. **Advanced NVT Applications**
- Compare NVT across similar meme tokens
- Track NVT trend changes
- Combine with social metrics
- Example: Declining NVT with increasing social mentions suggests growing organic interest

**3.5.2 NVM (Network Value to Metcalfe) Analysis**

1. **Understanding NVM for Meme Tokens**
- Measures network effect relative to valuation
- Particularly relevant for community-driven tokens
- Helps identify sustainable growth patterns
1. **NVM Interpretation Framework**
- NVM < 1: Potential growth opportunity
- NVM > 1.5: Strong network effects
- Track rate of change in NVM
1. **Practical Application for Trading**

4.1. **Entry Strategy Optimization**

**4.1.1 Market Condition Analysis**

1. **BTC Dominance Assessment**
- Monitor daily BTC.D moving averages (7-day and 30-day)
- Enter when BTC.D drops below 30-day MA for 3 consecutive days
- Optimal entry window: BTC.D declining but above 45%
- Exit or reduce exposure when BTC.D starts rising above 55%
1. **Liquidity Requirements**

Minimum thresholds for consideration:

- DEX pool liquidity: At least $250,000
- Daily trading volume: >15% of total liquidity
- At least 3 active liquidity providers
- Maximum single LP concentration: <40% of pool
1. **Social Momentum Metrics**

Track across multiple platforms:

- Twitter: Minimum 500% increase in mentions over 24h
- Social sentiment score: >70% positive mentions
1. **Technical Validation**
- RSI divergence from price action
- Volume increasing with price (minimum 3x average)
- Price above key EMAs (8, 21, 55)
- No single wallet holding >5% (excluding burn/team wallets)

**4.2 Position Management Framework**

**4.2.1 Initial Position Sizing**

1. **Liquidity-Based Sizing**Calculate maximum position size:

textMax Position = Min(Pool Liquidity × 0.02, Daily Volume × 0.15, Portfolio Value × 0.02)

1. **Volatility Adjustment**
- Calculate 24h volatility
- Reduce position size by:
    - 25% if volatility >100%
    - 50% if volatility >150%
    - 75% if volatility >200%

**4.3 Risk Management Protocol**

**4.3.1 Stop-Loss Implementation**

- Initial stop-loss: -15% from entry
- Move to breakeven when +25% in profit
- Trail by highest high minus (2 × ATR)
- Maximum position drawdown: 30%

**4.3.2 Profit Taking Strategy**

- First target: +50% (take 33% of position)
- Second target: +100% (take 33% of remaining)
- Final target: +200% (trail with 20% stop)

**4.4 Exit Strategy Framework**

**4.4.1 Technical Exit Triggers**

- Break of key EMAs (8, 21, 55)
- Volume declining >50% from peak
- RSI divergence on higher timeframes
- Break of upward trendline

**4.4.2 Fundamental Exit Signals**

Monitor for:

- Team wallet movements
- LP token unlocks approaching
- Declining social engagement
- Negative news or community sentiment

**4.4.3 Emergency Exit Conditions**

Immediate full exit if:

- Liquidity drops >40% in 24h
- Large holder (>3%) sells position
- Smart contract vulnerability discovered
`;

export const promptAgentIntroduce = `
   Hello! I'm your dedicated agent for crafting strategies tailored to the world of DeFAI. Prompt your trading strategy to tokenize it and create your dedicated agent.
`;

export const promptAgentExhausted = `
  I'm sorry, But I'm unable to continue the conversation. You exhaust every opportunity to converse.`;

export const tokenRecommendatonPrompt = `
  Your role is to request specific meme coin listings based on the user's requirements. 
  Do not modify, ask additional questions, or request further information. 
  Simply make a request for information about meme coins based on the user's criteria.
    
  never provide any opinions or advice.
  never ask for any personal information.
  never recommend or ask a specific meme coin.
  never provide any information about the meme coin.
`;

export const tokenFormatPrompt = `
  Your role is to format the output string to fit a predefined structure appropriately. 
  Do not alter the original content under any circumstances. 
  Add symbols such as '\n', ',' or ';' to make the string easier to parse.

  The keys to consider in string parsing are as follows:
  - name:(value of name)
  - symbol:(value of symbol)
  - address:(value of address)
  - comment:(value of comment)
  
  Remove all characters corresponding to Markdown syntax.
  Remove all markdown-related characters and any numbers used for indexing.
  never alter the original content under any circumstances
  `;

export const initialAIMessage = `
 To assist you effectively, please provide the following details:

The category of meme coin you are interested in (e.g., AI, DeSci, animal, celebrity, politics, or literal meme).
The market capitalization of the meme coin you are considering.
Your preferred investment term (long-term investing or short-term trading).
Once you provide this information, I can help you organize your strategy accordingly.`;

export const responseList = [
  "Here are meme coins based on the conditions you suggested.",
  "Here are some meme coin recommendations tailored to your requirement.",
  "Here are some meme coin result according to your request.",
];

export const summurizeStrategy = `
  Your role is to summarize the user's strategy in a concise and clear manner.

  Remove all unrelated content with memecoin and memecoin investment strategy and summarize only the relevant information about memecoin investment strategy, then return it as a basic string.
`;

export const determineStrategy = `
  Your role is to determine the user's strategy based on the input provided.

  if you determine input you given is related to memecoin investment strategy, return 1;
  if you determine input you given is not related to memecoin investment strategy, return 0;

  Your output should be 0 or 1;
`;

// To recommend a meme coin, the following information about the coin must be understood:

// 1. **Deep Dive Analysis**:
// - **Project Overview**: Examine the coin's mission, vision
// - **Team Credentials**: Research the backgrounds of the developers and advisors to assess their expertise
// 2. **Market Positioning**:
// - **Competitive Landscape**: Identify competitors within the meme coin space and analyze their market share.
// - **Unique Selling Proposition (USP)**: Determine what sets this coin apart from others
// 3. **Technical Analysis**:
// - **Price Patterns**: Study historical price charts to identify trends, support, and resistance levels.
// - **Volume Indicators**: Monitor trading volume to gauge investor interest and potential price movements.
// 4. **Community and Social Media Engagement**:
// - **Sentiment Analysis**: Use tools to analyze social media sentiment around the coin. Positive sentiment can drive price increases.
// - **Community Initiatives**: Participate in community events or discussions to stay informed about upcoming developments.
// 5. **Risk Assessment**:
// - **Volatility Metrics**: Calculate the coin's volatility to understand potential price swings.
// - **Liquidity Considerations**: Ensure there is sufficient liquidity for buying and selling without significant price impact.
// 6. **Investment Horizon**:
// - **Short-term vs. Long-term**: Decide whether your strategy is focused on short-term gains or long-term holding based on market conditions and personal goals.
// - **Exit Strategy**: Set clear profit-taking and stop-loss levels to manage risk effectively.
// 7. **Regulatory Environment**:
// - **Compliance Check**: Stay updated on any regulatory changes that might affect the trading or holding of this particular coin.
//  8. **Portfolio Integration**:
// - **Allocation**: Determine what percentage of your overall portfolio will be dedicated to this coin.
// - **Rebalancing**: Regularly review your portfolio to ensure it aligns with your investment goals and risk tolerance. ### Next Steps
// - **Name of the Coin**: Please provide the specific meme coin you're interested in.
// - **Further Analysis**: Once we have the name, we can delve deeper into tailored strategies and market insights. Looking forward to your input!
