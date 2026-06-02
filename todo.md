# TODO

- [x] 修改钱包连接提示文案：中文改为"即将开放，预售期间暂未开放"，英文和越南语同步修改
- [x] 保存 checkpoint 并部署
- [x] 集成 Web3 钱包 SDK（wagmi + RainbowKit）
- [x] 激活导航栏连接钱包按钮，支持 MetaMask、Trust Wallet、WalletConnect
- [x] 将代币经济学部分从环形图表改为表格形式（v2.0 版本）
- [x] 更新表格翻译键（中文/英文/越南语）
- [x] 调整主页布局：将加入社区板块移到参与预售之后，作为主页上方内容
- [x] 删除 VideoSection 中的加入社区按钮，将社区招募视频移到 CommunitySection
- [x] 设计后台数据模型（访问统计、用户数据、流动池交易）
- [x] 创建数据库表结构（analytics、liquidity_pools、trades）
- [x] 实现后台 API 接口（数据查询、统计聚合）
- [x] 构建后台管理仪表板 UI（访问分析、交易监控）
- [x] 集成流动池交易追踪（BSC 链上数据）
- [x] 添加基于角色的访问控制（管理员权限）
- [x] 为后台添加登录窗口和权限验证
- [x] 为项目所有者自动设置管理员权限
- [x] 为后台管理系统添加中英文双语言支持
- [x] 扩展交易数据模型，添加购买/抛售类型和详细交易信息
- [x] 创建交易者详情表格，展示每笔交易的详细数据（金额、类型、时间等）
- [x] 创建吸睛的开场动画（粒子系统、极光背景、品牌文字动画）
- [x] 集成开场动画到主页，支持跳过功能
- [x] 优化动画性能，确保加载速度
- [x] 创建超级魔幻科技开场动画（粒子、扫描线、霞虹效果、波纹）
- [x] 集成新开场动画并替换旧版本
- [x] 优化超级动画性能，支持多设备
- [x] 根据参考视频重新设计开场动画（赛博朋克全息发光美学、中心雪花能量源、光束、数据可视化）
- [x] 实现新的全息开场动画组件（HolographicIntroAnimation）
- [x] 集成新动画并替换旧版本
- [x] 设计以 ISC Logo 为主题的开场动画（科技冰雪赛博朋克、城市背景、人物仰视）
- [x] 实现新的 ISCLogoIntroAnimation 组件
- [x] 集成新动画并替换旧版本
- [x] 移除开场动画功能，恢复主页直接显示内容
- [x] 创建价格数据模型和 tRPC API 接口（支持多链价格查询）
- [x] 集成 CoinGecko API 获取实时价格数据（BTC、ETH、ISC 等）
- [x] 构建可视化价格图表组件（折线图、K线图、价格卡片）
- [x] 在主页集成价格图表功能
- [x] 添加中英文双语支持
- [ ] 为 CoinGecko API 集成添加请求缓存和错误重试机制，处理速率限制
- [ ] 为价格图表添加明确的错误状态提示（如 CoinGecko 限流、网络失败）
- [ ] 为 CoinGecko 集成补充 Vitest 单元测试，覆盖成功返回、限流、网络失败场景


## 主页改版 (ISC 白皮书 3.0)

- [x] 根据白皮书 3.0 重新设计主页结构和内容
- [x] 更新 Hero 部分，突出"完全去中心化"和"社区治理"特性
- [x] 创建"代币经济学"展示区，展示分层锁定机制
- [x] 创建"NFT 纪念币"展示区 (2026 个限量版)
- [x] 创建"GameFi 生态"展示区，展示开发进度
- [x] 创建"路线图"展示区，展示 Q2/Q3 计划
- [x] 创建"治理模型"展示区，展示社区 DAO 机制
- [x] 添加"安全基础"部分，展示合约所有权释放证明
- [x] 优化移动端响应式设计
- [x] 完善中英文双语内容


## DEX 交易所优化

- [x] 从 DEX 列表中删除 MDEX、BabySwap、dYdX、1inch
- [x] 重新创建 DexTradeSection 组件，只包含 12 个 DEX
- [x] 将 DexTradeSection 集成到主页
- [x] 发布更新

## 紧急更新 - 预售日期修正

- [x] 更新预售结束日期为 2026-04-30
- [x] 更新预售徽章文本为 "Presale Live Now — Ends April 30, 2026"
- [x] 倒计时自动更新为距离 4 月 30 日的剩余时间

## 安全徽章和信息展示

- [x] 创建 SecurityBadgeBar 组件 - Hero 下方的 3 个徽章（LP Locked、DAO Governance、Email）
- [x] 创建 SecurityTransparency 组件 - 2x2 网格卡片（Contract Security、Ownership、Liquidity Lock、Team Vesting）+ 底部横幅
- [x] 将 SecurityBadgeBar 集成到 Home.tsx（Hero 下方）
- [x] 将 SecurityTransparency 集成到 Home.tsx（Contract Info 和 Tokenomics 之间）
- [x] 更新 Footer 第四列为 Infrastructure，添加完整链接列表和联系信息
- [ ] 为新组件编写 Vitest 单元测试 (需要配置 jsdom 环境和 @testing-library/react)


## Bug 修复

- [x] 修复 SecurityBadgeBar 中的 React DOM 错误 (motion.a 改为 motion.div + 标准 a 标签)


## 全面修复 - React 错误和稳定性

- [x] 检查并修复所有 motion 组件的 DOM 操作问题
- [x] 验证 SecurityBadgeBar 和 SecurityTransparency 组件的稳定性
- [x] 检查 Framer Motion 版本兼容性
- [x] 修复所有可能的内存泄漏和 React 警告
- [x] 优化组件卸载时的清理逻辑
- [x] 验证生产环境部署


## 生产环境问题诊断

- [x] 定位并修复生产环境浏览器控制台中的 401 资源错误 (OAuth 认证相关，不影响页面)
- [x] 确认 401 错误不会触发用户可见弹窗
- [x] 完成生产环境验证清单（首页加载、控制台、核心交互）


## 新增功能 - How to Buy 和 FAQ 板块

- [x] 创建 HowToBuySection 组件 - 3 步购买流程（Ecosystem 下方）
- [x] 创建 FAQSection 组件 - 6 个常见问题手风琴（How to Buy 下方）
- [x] 将 HowToBuySection 集成到 Home.tsx
- [x] 将 FAQSection 集成到 Home.tsx
- [x] 验证页面布局和交互


## Footer 重建

- [ ] 重建 Footer 组件，采用 4 列布局（Project、Resources、Community、Contact & Contract）
- [ ] 添加所有链接和社交媒体
- [ ] 实现合约地址复制功能
- [ ] 添加版权和法律链接
- [ ] 验证所有链接和交互


## 紧急修复 - BSCScan 审核关键错误

- [x] 修改 Tokenomics 板块：审计公司从"CertiK 和 OpenZeppelin"改为"TechRate（2026年4月完成，21项安全检查全部通过）"
- [x] 修改 Security & Governance 中的安全审计卡片状态为"已完成（2026年4月）"并添加报告下载链接
- [x] 修改 Security & Transparency 中的团队代币卡片标题为"团队代币已锁定（24个月线性归属）"
- [x] 页脚添加 Telegram 链接
- [x] 页脚添加 GitHub 链接
- [x] 页脚添加风险披露声明
- [ ] 验证英文版本内容完整性


## 整体多语言系统修复

- [x] 修复 HowToBuySection 和 FAQSection 中的翻译键
- [x] 修复 DexTradeSection 中的翻译键
- [x] 修复 SecurityTransparency 中的翻译键
- [x] 修复 Footer 中的翻译键（Project、Resources、Community、Contact & Contract、Privacy Policy、Terms of Service、Copyright、Risk Disclaimer）
- [x] 验证所有语言切换功能正常工作（中文、英文、越南文）
- [x] 编写整体多语言系统的单元测试


## 紧急修复 - 页面重复和冗余内容

- [x] 删除社区招募视频的重复渲染（删除 VideoSection 组件）
- [x] 删除多余的加密货币价格板块（删除 PriceChart 组件）
- [x] 验证页面布局连贯无缝隙
- [x] 验证多语言功能不受影响


## 去中心化叙事一致性优化

- [x] 优化 Presale 板块 - 替换为 "Trade on PancakeSwap"
- [x] 删除官方邮箱 team@icesnowcoin.com
- [x] 添加 Snapshot DAO 治理链接按顁
- [x] 修改 Tokenomics 文案 - "Team Holdings" 改为 "Core Contributor Allocation"
- [x] 修改 Tokenomics 文案 - 删除 "marketing" 改为 "R&D, operations, airdrops, ecosystem growth"
- [x] 删除首页 DEX 交易板块
- [x] 验证所有修改后的页面显示正常
- [x] 验证多语言功能不受影响


## 最终修复清单 - 部署前必须完成

- [x] 修复 Roadmap Q2 审计状态 - 已通过 TechRate 审计，21 项安全检查全部通过
- [x] 删除 Roadmap 中的"代币上市申请"
- [x] 删除 HowToBuySection 中的 Step 03 板块
- [x] 修改 Step 02 为 USDT 路径 - "前往 PancakeSwap，将 USDT 交换为 ISC"
- [x] 修改社区板块文案为社区治理 - "参与 Snapshot 投票，决定 ISC 的未来"
- [x] 修复所有 JavaScript 错误 - 页面编译无错误
- [x] 验证 Presale 已替换为 "ISC is Live on BSC"
- [x] 验证 DEX 板块已删除
- [x] 验证加密货币价格板块已删除
- [x] 验证社区招募视频无重复
- [x] 验证多语言切换正常
- [x] 删除 Footer 中的官方邮箱
- [x] 修改 Tokenomics 表格分类，删除 Marketing 改为 R&D


## 关键优化任务 - 2026年6月

### Logo 和根目录配置
- [x] 从 GitHub 拉取官方 Logo 文件
- [x] 配置 Logo 到官网根目录 (/public)
- [x] 更新 Navbar 中的 Logo 引用
- [x] 验证 Logo 在所有页面正确显示

### 删除倒计时板块
- [x] 删除 HeroSection 中的倒计时逻辑
- [x] 删除倒计时相关的 CSS 样式
- [x] 删除倒计时的多语言翻译键
- [x] 验证 Hero 部分显示正常

### APY 合约和质押板块更新
- [x] 更新 Staking 合约地址
- [x] 更新 APY 计算逻辑
- [x] 更新质押池子信息
- [x] 更新多语言内容
- [x] 验证质押功能正常工作

### SEO 优化和爬虫配置
- [x] 更新 robots.txt - 允许所有爬虫
- [x] 更新 sitemap.xml - 包含所有页面
- [x] 添加 Google Search Console 验证
- [x] 添加 Bing Webmaster 验证
- [x] 添加 Open Graph 元标签
- [x] 添加 JSON-LD 结构化数据
- [x] 验证 Google 可以索引

### 删除占位符和测试内容
- [x] 删除所有 "Coming Soon" 占位符
- [x] 删除所有测试数据和示例内容
- [x] 删除 ComponentShowcase.tsx 测试文件
- [x] 删除所有 TODO 注释
- [x] 删除所有调试代码
- [x] 验证页面内容完整

### 测试和验证
- [x] 检查所有链接有效性
- [x] 验证多語言切换功能
- [x] 验证 SEO 元标签
- [x] 测试爬虫抬取
- [x] 性能检查

### 部署和推送
- [x] 创建检查点
- [x] 推送到 GitHub
- [x] 部署到生产环境
- [x] 验证生产环境正常
