/**
 * Main Application Module
 */

let currentScreen = 'home';

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('[v0] App initializing...');
    Storage.init();
    initApp();
    updateUI();
});

function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Load home screen
    goToScreen('home');
    
    // Update UI with stored data
    updateUI();
    
    console.log('[v0] App initialized successfully');
}

function setupEventListeners() {
    // Menu button
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => goToScreen('notifications'));
    }

    // Balance toggle
    const toggleBalance = document.getElementById('toggleBalance');
    if (toggleBalance) {
        toggleBalance.addEventListener('click', toggleBalanceVisibility);
    }

    // Keyboard escape for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Load recent transactions
    loadRecentTransactions();
}

function goToScreen(screenName) {
    console.log('[v0] Going to screen:', screenName);
    
    currentScreen = screenName;

    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Hide custom content
    const screenContent = document.getElementById('screenContent');
    if (screenContent) screenContent.innerHTML = '';

    // Show home or load custom screen
    if (screenName === 'home') {
        const homeScreen = document.getElementById('homeScreen');
        if (homeScreen) homeScreen.classList.add('active');
    } else {
        loadScreenContent(screenName);
    }

    // Update nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenName);
    });

    // Close menu
    closeMenu();

    // Update header
    updateHeader(screenName);

    // Scroll to top
    const mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.scrollTop = 0;
}

function loadScreenContent(screenName) {
    const screenContent = document.getElementById('screenContent');
    if (!screenContent) return;

    let html = '';

    switch(screenName) {
        case 'profile':
            html = getProfileScreenHTML();
            break;
        case 'transfer':
            html = getTransferScreenHTML();
            break;
        case 'crypto-wallet':
            html = getCryptoWalletScreenHTML();
            break;
        case 'crypto-transaction':
            html = getCryptoTransactionScreenHTML();
            break;
        case 'savings':
            html = getSavingsScreenHTML();
            break;
        case 'subscriptions':
            html = getSubscriptionsScreenHTML();
            break;
        case 'loan-calculator':
            html = getLoanCalculatorScreenHTML();
            break;
        case 'loan-application':
            html = getLoanApplicationScreenHTML();
            break;
        case 'budget':
            html = getBudgetScreenHTML();
            break;
        case 'referral':
            html = getReferralScreenHTML();
            break;
        case 'loyalty-dashboard':
            html = getLoyaltyDashboardScreenHTML();
            break;
        case 'history':
            html = getHistoryScreenHTML();
            break;
        case 'notifications':
            html = getNotificationsScreenHTML();
            break;
        case 'payment':
            html = getPaymentScreenHTML();
            break;
        case 'request-money':
            html = getRequestMoneyScreenHTML();
            break;
        case 'qr':
            html = getQRScreenHTML();
            break;
        default:
            html = getComingSoonHTML(screenName);
    }

    screenContent.innerHTML = html;
    screenContent.classList.add('active');

    // Set up event listeners for newly created elements
    setupScreenEventListeners(screenName);
}

// Screen HTML generators
function getProfileScreenHTML() {
    const user = Storage.getUser();
    const balance = Storage.getBalance();
    const bankAccounts = Storage.getBankAccounts();

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Profile</h1>
                </div>

                <div class="card with-shadow">
                    <div style="text-align: center;">
                        <img src="${user.avatar}" alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 16px;">
                        <h2 style="margin: 0 0 8px 0; font-size: 18px;">${user.name}</h2>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 13px;">${user.email}</p>
                        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 13px;">${user.phone}</p>
                    </div>
                </div>

                <div class="card with-shadow" style="margin-top: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Account Balance</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 16px; font-weight: 500;">Total Balance</span>
                        <span style="font-size: 18px; font-weight: 700;">₹${balance.toFixed(2)}</span>
                    </div>
                </div>

                <div class="card with-shadow" style="margin-top: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Bank Accounts</h3>
                    <div id="bankAccountsList"></div>
                </div>

                <button class="btn btn-primary" onclick="logout()" style="margin-top: 24px;">Logout</button>
            </div>
        </div>
    `;
}

function getTransferScreenHTML() {
    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Send Money</h1>
                </div>

                <form onsubmit="handleTransfer(event)">
                    <div class="form-group">
                        <label>Recipient Name</label>
                        <input type="text" placeholder="Enter name" required>
                    </div>

                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Enter phone number" required>
                    </div>

                    <div class="form-group">
                        <label>Amount</label>
                        <input type="number" placeholder="Enter amount" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label>Note (Optional)</label>
                        <textarea placeholder="Add a note"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Send Money</button>
                    <button type="button" class="btn btn-secondary" onclick="goToScreen('home')" style="margin-top: 8px;">Cancel</button>
                </form>
            </div>
        </div>
    `;
}

function getCryptoWalletScreenHTML() {
    const wallets = Storage.getCryptoWallets();
    const balance = Storage.getBalance();

    let walletsHTML = wallets.map(wallet => `
        <div class="card with-shadow" style="margin-bottom: 12px; cursor: pointer;" onclick="goToScreen('crypto-transaction')">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                        ${wallet.icon}
                    </div>
                    <div>
                        <p style="margin: 0; font-weight: 600; font-size: 14px;">${wallet.name}</p>
                        <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 12px;">${wallet.quantity} ${wallet.symbol}</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: 600; font-size: 14px;">₹${wallet.balance.toFixed(2)}</p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: ${wallet.change24h > 0 ? '#10b981' : '#ef4444'};">${wallet.change24h > 0 ? '+' : ''}${wallet.change24h}%</p>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Crypto Wallet</h1>
                </div>

                <div class="card with-shadow" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 13px;">Total Portfolio Value</p>
                    <h2 style="margin: 0; font-size: 28px;">₹${wallets.reduce((sum, w) => sum + w.balance, 0).toFixed(2)}</h2>
                    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 12px;">Available to trade</p>
                </div>

                <div style="margin-top: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Your Holdings</h3>
                    ${walletsHTML}
                </div>

                <button class="btn btn-primary" onclick="goToScreen('crypto-transaction')" style="margin-top: 20px;">Buy / Sell Crypto</button>
            </div>
        </div>
    `;
}

function getCryptoTransactionScreenHTML() {
    const wallets = Storage.getCryptoWallets();
    const balance = Storage.getBalance();

    let walletsOptions = wallets.map(w => `<option value="${w.id}">${w.name} (${w.symbol})</option>`).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('crypto-wallet')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Buy / Sell Crypto</h1>
                </div>

                <div class="card with-shadow">
                    <p style="margin: 0 0 8px 0; color: var(--text-secondary); font-size: 13px;">Available Balance</p>
                    <h2 style="margin: 0; font-size: 24px;">₹${balance.toFixed(2)}</h2>
                </div>

                <form onsubmit="handleCryptoTransaction(event)" style="margin-top: 20px;">
                    <div class="form-group">
                        <label>Transaction Type</label>
                        <select id="txnType" required onchange="updateCryptoPrice()">
                            <option value="">Select type</option>
                            <option value="buy">Buy Crypto</option>
                            <option value="sell">Sell Crypto</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Select Cryptocurrency</label>
                        <select id="cryptoSelect" required onchange="updateCryptoPrice()">
                            <option value="">Select crypto</option>
                            ${walletsOptions}
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" id="cryptoQuantity" placeholder="Enter quantity" step="0.0001" required>
                    </div>

                    <div class="form-group">
                        <label>Price per Unit (₹)</label>
                        <input type="number" id="cryptoPrice" placeholder="Enter price" step="0.01" readonly>
                    </div>

                    <div class="form-group">
                        <label>Total Amount</label>
                        <h3 style="margin: 0; font-size: 20px;">₹<span id="cryptoTotal">0.00</span></h3>
                    </div>

                    <button type="submit" class="btn btn-primary">Confirm Transaction</button>
                    <button type="button" class="btn btn-secondary" onclick="goToScreen('crypto-wallet')" style="margin-top: 8px;">Cancel</button>
                </form>
            </div>
        </div>
    `;
}

function getSavingsScreenHTML() {
    const deposits = Storage.getFixedDeposits();
    const balance = Storage.getBalance();

    let depositsHTML = deposits.map(deposit => {
        const daysRemaining = Math.ceil((new Date(deposit.maturityDate) - new Date()) / (1000 * 60 * 60 * 24));
        return `
            <div class="card with-shadow" style="margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">₹${deposit.amount.toFixed(2)}</p>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 12px;">${deposit.tenure} months FD @ ${deposit.interestRate}%</p>
                        <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 12px;">Matures in ${daysRemaining} days</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0 0 4px 0; color: #10b981; font-weight: 600; font-size: 14px;">+₹${deposit.interestEarned.toFixed(2)}</p>
                        <span class="badge badge-success">${deposit.status}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Savings</h1>
                </div>

                <div class="card with-shadow" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); color: white;">
                    <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 13px;">Total in Savings</p>
                    <h2 style="margin: 0; font-size: 28px;">₹${deposits.reduce((sum, d) => sum + d.totalAmount, 0).toFixed(2)}</h2>
                </div>

                <div style="margin-top: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Active Deposits</h3>
                    ${depositsHTML || '<p style="color: var(--text-secondary);">No active deposits</p>'}
                </div>

                <button class="btn btn-primary" onclick="openCreateFD()" style="margin-top: 20px;">Create New FD</button>
            </div>
        </div>
    `;
}

function getSubscriptionsScreenHTML() {
    const subscriptions = Storage.getSubscriptions();

    let subsHTML = subscriptions.map(sub => `
        <div class="card with-shadow" style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${sub.name}</p>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 12px;">₹${sub.amount} / ${sub.frequency}</p>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 12px;">Next billing: ${new Date(sub.nextBillingDate).toLocaleDateString()}</p>
                </div>
                <div style="text-align: right;">
                    <span class="badge ${sub.status === 'active' ? 'badge-success' : 'badge-warning'}">${sub.status}</span>
                    <button onclick="pauseSubscription('${sub.id}')" class="btn btn-sm btn-outline" style="margin-top: 8px;">Pause</button>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Subscriptions</h1>
                </div>

                <div class="card with-shadow">
                    <p style="margin: 0 0 8px 0; color: var(--text-secondary); font-size: 13px;">Monthly Spending</p>
                    <h2 style="margin: 0; font-size: 28px;">₹${subscriptions.reduce((sum, s) => s.frequency === 'monthly' ? sum + s.amount : sum, 0)}</h2>
                </div>

                <div style="margin-top: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Active Subscriptions</h3>
                    ${subsHTML || '<p style="color: var(--text-secondary);">No subscriptions</p>'}
                </div>

                <button class="btn btn-primary" onclick="openAddSubscription()" style="margin-top: 20px;">Add Subscription</button>
            </div>
        </div>
    `;
}

function getLoanCalculatorScreenHTML() {
    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Loan Calculator</h1>
                </div>

                <div class="form-container">
                    <div class="form-group">
                        <label>Loan Amount (₹)</label>
                        <input type="number" id="loanAmount" placeholder="100000" value="100000" oninput="calculateEMI()">
                    </div>

                    <div class="form-group">
                        <label>Interest Rate (% p.a.)</label>
                        <input type="number" id="loanRate" placeholder="10" value="10" step="0.1" oninput="calculateEMI()">
                    </div>

                    <div class="form-group">
                        <label>Tenure (Months)</label>
                        <input type="number" id="loanTenure" placeholder="60" value="60" oninput="calculateEMI()">
                    </div>

                    <div class="card with-shadow">
                        <h3 style="margin: 0 0 12px 0;">Loan Summary</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Monthly EMI</span>
                            <strong>₹<span id="emiAmount">0.00</span></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Total Interest</span>
                            <strong>₹<span id="totalInterest">0.00</span></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border-color);">
                            <span>Total Amount</span>
                            <strong style="font-size: 16px;">₹<span id="totalAmount">0.00</span></strong>
                        </div>
                    </div>

                    <button class="btn btn-primary" onclick="goToScreen('loan-application')" style="margin-top: 20px;">Apply for Loan</button>
                </div>
            </div>
        </div>
    `;
}

function getLoanApplicationScreenHTML() {
    const loans = Storage.getLoans();

    let loansHTML = loans.map(loan => `
        <div class="card with-shadow" style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">₹${loan.amount.toFixed(2)}</p>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 12px;">EMI: ₹${loan.monthlyEMI}</p>
                    <div style="margin-top: 8px;">
                        <p style="margin: 0 0 4px 0; color: var(--text-secondary); font-size: 12px;">Progress</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(loan.paidAmount / loan.amount) * 100}%"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span class="badge badge-info">${loan.status}</span>
                    ${loan.status === 'active' ? `<button onclick="payLoanEMI('${loan.id}')" class="btn btn-sm btn-primary" style="margin-top: 8px;">Pay EMI</button>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('loan-calculator')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">My Loans</h1>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Active Loans</h3>
                    ${loansHTML || '<p style="color: var(--text-secondary);">No active loans</p>'}
                </div>

                <form onsubmit="handleApplyLoan(event)">
                    <div class="form-section">
                        <h3>Apply for New Loan</h3>
                        
                        <div class="form-group">
                            <label>Loan Amount (₹)</label>
                            <input type="number" id="applyAmount" placeholder="Enter amount" required>
                        </div>

                        <div class="form-group">
                            <label>Interest Rate (% p.a.)</label>
                            <input type="number" id="applyRate" placeholder="Enter rate" step="0.1" value="9.5" required>
                        </div>

                        <div class="form-group">
                            <label>Tenure (Months)</label>
                            <input type="number" id="applyTenure" placeholder="Enter months" value="60" required>
                        </div>

                        <button type="submit" class="btn btn-primary">Apply for Loan</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function getBudgetScreenHTML() {
    const categories = Storage.getBudgetCategories();

    let budgetHTML = categories.map(cat => `
        <div class="card with-shadow" style="margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="font-size: 24px;">${cat.icon}</span>
                <div style="flex: 1;">
                    <p style="margin: 0; font-weight: 600; font-size: 14px;">${cat.name}</p>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 12px;">₹${cat.spent} / ₹${cat.budget}</p>
                </div>
                <span style="font-weight: 600; color: ${cat.percentage > 80 ? '#ef4444' : '#10b981'}">${cat.percentage.toFixed(0)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(cat.percentage, 100)}%; background-color: ${cat.percentage > 80 ? '#ef4444' : cat.percentage > 60 ? '#f59e0b' : '#10b981'};"></div>
            </div>
        </div>
    `).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Budget</h1>
                </div>

                <div class="card with-shadow">
                    <p style="margin: 0 0 8px 0; color: var(--text-secondary); font-size: 13px;">Total Spending</p>
                    <h2 style="margin: 0; font-size: 28px;">₹${categories.reduce((sum, c) => sum + c.spent, 0)}</h2>
                    <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 12px;">out of ₹${categories.reduce((sum, c) => sum + c.budget, 0)} budget</p>
                </div>

                <div style="margin-top: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Category Breakdown</h3>
                    ${budgetHTML}
                </div>
            </div>
        </div>
    `;
}

function getReferralScreenHTML() {
    const referral = Storage.getReferral();

    let referredHTML = referral.referredUsers.map(user => `
        <div class="list-item">
            <div class="list-item-content">
                <p class="list-item-title">${user.name}</p>
                <p class="list-item-subtitle">${user.phone}</p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; font-weight: 600;">+₹${user.earnedReward}</p>
                <span class="badge badge-success">${user.status}</span>
            </div>
        </div>
    `).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Referral Program</h1>
                </div>

                <div class="card with-shadow" style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); color: #0c2d6b;">
                    <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 13px;">Total Earned</p>
                    <h2 style="margin: 0; font-size: 28px;">₹${referral.earnedAmount.toFixed(2)}</h2>
                    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 12px;">${referral.referredCount} friends invited</p>
                </div>

                <div class="card with-shadow" style="margin-top: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Your Referral Code</h3>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="text" value="${referral.referralCode}" readonly style="flex: 1; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-weight: 600;">
                        <button onclick="copyToClipboard('${referral.referralCode}')" class="btn btn-sm btn-primary">Copy</button>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Referred Friends</h3>
                    ${referredHTML || '<p style="color: var(--text-secondary);">No referrals yet</p>'}
                </div>

                ${referral.earnedAmount > 0 ? `<button class="btn btn-primary" onclick="claimReferralReward()" style="margin-top: 20px;">Claim Reward</button>` : ''}
            </div>
        </div>
    `;
}

function getLoyaltyDashboardScreenHTML() {
    const loyalty = Storage.getLoyaltyTier();
    const referral = Storage.getReferral();

    const tierColors = {
        'bronze': '#CD7F32',
        'silver': '#C0C0C0',
        'gold': '#FFD700',
        'platinum': '#E5E4E2'
    };

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Loyalty Program</h1>
                </div>

                <div class="card with-shadow" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); color: #5a2d1f;">
                    <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 13px;">Your Tier</p>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background-color: ${tierColors[loyalty.tier]}; display: flex; align-items: center; justify-content: center; font-size: 32px;">
                            <i class="fas fa-crown"></i>
                        </div>
                        <div>
                            <h2 style="margin: 0; font-size: 24px; text-transform: capitalize;">${loyalty.tier.toUpperCase()}</h2>
                            <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">${loyalty.points} points</p>
                        </div>
                    </div>
                </div>

                <div class="card with-shadow" style="margin-top: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Tier Benefits</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${loyalty.benefits.map(benefit => `<li style="padding: 8px 0; display: flex; gap: 8px;"><i class="fas fa-check" style="color: #10b981; margin-top: 2px;"></i> <span>${benefit}</span></li>`).join('')}
                    </ul>
                </div>

                <div class="card with-shadow" style="margin-top: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px;">Points Multiplier</h3>
                    <h2 style="margin: 0; font-size: 28px;">${loyalty.multiplier}x</h2>
                    <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 12px;">Earn more points on all transactions</p>
                </div>

                <div class="alert alert-info" style="margin-top: 16px;">
                    <div class="alert-icon"><i class="fas fa-info-circle"></i></div>
                    <div class="alert-content">
                        <p class="alert-title">Referral Bonus</p>
                        <p class="alert-message">You've earned ₹${referral.earnedAmount} from ${referral.referredCount} referrals!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getHistoryScreenHTML() {
    const transactions = Storage.getTransactions();

    let historyHTML = transactions.map(txn => {
        const txnDate = new Date(txn.date);
        const isToday = txnDate.toDateString() === new Date().toDateString();
        const displayDate = isToday ? 'Today' : txnDate.toLocaleDateString();

        return `
            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon" style="background: ${txn.type === 'received' ? '#d1fae5' : '#fee2e2'}; color: ${txn.type === 'received' ? '#065f46' : '#991b1b'};">
                        <i class="fas fa-${txn.type === 'received' ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <p class="transaction-name">${txn.description}</p>
                        <p class="transaction-time">${displayDate}</p>
                    </div>
                </div>
                <p class="transaction-amount ${txn.type}">${txn.type === 'received' ? '+' : '-'}₹${txn.amount.toFixed(2)}</p>
            </div>
        `;
    }).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Activity</h1>
                </div>

                <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                    <input type="text" placeholder="Search transactions..." style="flex: 1; padding: 10px 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 13px;">
                    <button class="btn btn-sm btn-secondary"><i class="fas fa-filter"></i></button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${historyHTML}
                </div>
            </div>
        </div>
    `;
}

function getNotificationsScreenHTML() {
    const notifications = Storage.getNotifications();

    let notificationsHTML = notifications.map(notif => `
        <div class="card with-shadow" style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${notif.title}</p>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 12px;">${notif.message}</p>
                    <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 11px;">${new Date(notif.date).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Notifications</h1>
                </div>

                ${notificationsHTML ? notificationsHTML : '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-bell"></i></div><p class="empty-state-title">No notifications</p><p class="empty-state-message">You\'re all caught up!</p></div>'}
            </div>
        </div>
    `;
}

function getPaymentScreenHTML() {
    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Make Payment</h1>
                </div>

                <form onsubmit="handlePayment(event)">
                    <div class="form-group">
                        <label>Payment Type</label>
                        <select required>
                            <option>Merchant Payment</option>
                            <option>Bill Payment</option>
                            <option>Recharge</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Amount</label>
                        <input type="number" placeholder="Enter amount" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" placeholder="Enter reason for payment">
                    </div>

                    <button type="submit" class="btn btn-primary">Proceed to Payment</button>
                    <button type="button" class="btn btn-secondary" onclick="goToScreen('home')" style="margin-top: 8px;">Cancel</button>
                </form>
            </div>
        </div>
    `;
}

function getRequestMoneyScreenHTML() {
    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">Request Money</h1>
                </div>

                <form onsubmit="handleRequestMoney(event)">
                    <div class="form-group">
                        <label>Recipient</label>
                        <input type="text" placeholder="Name or phone number" required>
                    </div>

                    <div class="form-group">
                        <label>Amount</label>
                        <input type="number" placeholder="Enter amount" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label>Note</label>
                        <textarea placeholder="What is this for?" rows="3"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Send Request</button>
                    <button type="button" class="btn btn-secondary" onclick="goToScreen('home')" style="margin-top: 8px;">Cancel</button>
                </form>
            </div>
        </div>
    `;
}

function getQRScreenHTML() {
    return `
        <div class="screen active">
            <div style="padding: 16px; max-width: 480px; margin: 0 auto; text-align: center;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <button class="back-btn" onclick="goToScreen('home')"><i class="fas fa-arrow-left"></i></button>
                    <h1 style="flex: 1; margin: 0; font-size: 20px;">QR Code</h1>
                </div>

                <div class="card with-shadow">
                    <p style="margin: 0 0 16px 0; color: var(--text-secondary); font-size: 13px;">Your unique payment QR code</p>
                    <div style="width: 200px; height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-lg); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
                        <i class="fas fa-qrcode"></i>
                    </div>
                    <button class="btn btn-primary">Download QR Code</button>
                </div>
            </div>
        </div>
    `;
}

function getComingSoonHTML(screenName) {
    return `
        <div class="screen active">
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-rocket"></i></div>
                <p class="empty-state-title">Coming Soon</p>
                <p class="empty-state-message">${screenName} feature is under development</p>
                <button class="btn btn-primary" onclick="goToScreen('home')" style="margin-top: 16px; width: 200px;">Back to Home</button>
            </div>
        </div>
    `;
}

// Event Handlers
function handleTransfer(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const amount = parseFloat(form.querySelector('input[type="number"]').value);

    if (amount <= Storage.getBalance()) {
        const newBalance = Storage.getBalance() - amount;
        Storage.updateBalance(newBalance);
        Storage.addTransaction({
            type: 'sent',
            amount: amount,
            description: `Transfer to ${name}`,
        });
        Storage.addNotification({
            type: 'payment',
            title: 'Money Sent',
            message: `₹${amount} sent to ${name}`,
        });
        updateUI();
        goToScreen('home');
    } else {
        alert('Insufficient balance');
    }
}

function handleCryptoTransaction(e) {
    e.preventDefault();
    const type = document.getElementById('txnType').value;
    const cryptoId = document.getElementById('cryptoSelect').value;
    const quantity = parseFloat(document.getElementById('cryptoQuantity').value);
    const pricePerUnit = parseFloat(document.getElementById('cryptoPrice').value);
    const totalAmount = quantity * pricePerUnit;

    if (type === 'buy') {
        if (totalAmount <= Storage.getBalance()) {
            const newBalance = Storage.getBalance() - totalAmount;
            Storage.updateBalance(newBalance);
            
            const wallets = Storage.getCryptoWallets();
            const walletIndex = wallets.findIndex(w => w.id === cryptoId);
            if (walletIndex !== -1) {
                wallets[walletIndex].quantity += quantity;
                wallets[walletIndex].balance = wallets[walletIndex].quantity * wallets[walletIndex].currentPrice;
                Storage.updateCryptoWallets(wallets);
            }

            Storage.addTransaction({
                type: 'sent',
                amount: totalAmount,
                description: `Bought crypto`,
            });
            Storage.addNotification({
                type: 'success',
                title: 'Crypto Purchased',
                message: `${quantity} units bought at ₹${pricePerUnit}`,
            });
            updateUI();
            goToScreen('crypto-wallet');
        } else {
            alert('Insufficient balance');
        }
    }
}

function calculateEMI() {
    const principal = parseFloat(document.getElementById('loanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('loanRate').value) || 0;
    const tenure = parseFloat(document.getElementById('loanTenure').value) || 0;

    if (principal && rate && tenure) {
        const monthlyRate = rate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
        const totalInterest = (emi * tenure) - principal;
        const totalAmount = principal + totalInterest;

        document.getElementById('emiAmount').textContent = emi.toFixed(2);
        document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
        document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
    }
}

function handleApplyLoan(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('applyAmount').value);
    const rate = parseFloat(document.getElementById('applyRate').value);
    const tenure = parseFloat(document.getElementById('applyTenure').value);

    const monthlyRate = rate / 12 / 100;
    const monthlyEMI = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);

    const loan = {
        amount: amount,
        interestRate: rate,
        tenure: tenure,
        monthlyEMI: Math.round(monthlyEMI),
        endDate: new Date(Date.now() + tenure * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        paidAmount: 0,
        remainingAmount: amount,
    };

    Storage.addLoan(loan);
    Storage.addNotification({
        type: 'info',
        title: 'Loan Application Submitted',
        message: `Application for ₹${amount} submitted`,
    });
    updateUI();
    loadScreenContent('loan-application');
}

function payLoanEMI(loanId) {
    const loans = Storage.getLoans();
    const loan = loans.find(l => l.id === loanId);

    if (loan && Storage.getBalance() >= loan.monthlyEMI) {
        const newBalance = Storage.getBalance() - loan.monthlyEMI;
        Storage.updateBalance(newBalance);

        loan.paidAmount += loan.monthlyEMI;
        loan.remainingAmount -= loan.monthlyEMI;
        if (loan.remainingAmount <= 0) {
            loan.status = 'completed';
            loan.remainingAmount = 0;
        }

        const loanIndex = loans.findIndex(l => l.id === loanId);
        loans[loanIndex] = loan;
        localStorage.setItem(Storage.KEYS.LOANS, JSON.stringify(loans));

        Storage.addTransaction({
            type: 'sent',
            amount: loan.monthlyEMI,
            description: `Loan EMI Payment - ₹${loan.monthlyEMI}`,
        });
        Storage.addNotification({
            type: 'success',
            title: 'EMI Paid',
            message: `₹${loan.monthlyEMI} EMI paid successfully`,
        });
        updateUI();
        loadScreenContent('loan-application');
    } else {
        alert('Insufficient balance for EMI payment');
    }
}

function pauseSubscription(subId) {
    Storage.updateSubscription(subId, { status: 'paused' });
    Storage.addNotification({
        type: 'info',
        title: 'Subscription Paused',
        message: 'Your subscription has been paused',
    });
    updateUI();
    loadScreenContent('subscriptions');
}

function openCreateFD() {
    const amount = prompt('Enter FD Amount (₹):');
    if (!amount) return;

    const tenure = prompt('Enter Tenure (months):');
    if (!tenure) return;

    const rate = prompt('Enter Interest Rate (% p.a.):');
    if (!rate) return;

    const deposit = {
        amount: parseFloat(amount),
        tenure: parseFloat(tenure),
        interestRate: parseFloat(rate),
        status: 'active',
        interestEarned: (parseFloat(amount) * parseFloat(rate) * parseFloat(tenure)) / (12 * 100),
        totalAmount: parseFloat(amount) + ((parseFloat(amount) * parseFloat(rate) * parseFloat(tenure)) / (12 * 100)),
        maturityDate: new Date(Date.now() + parseFloat(tenure) * 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    if (deposit.amount <= Storage.getBalance()) {
        const newBalance = Storage.getBalance() - deposit.amount;
        Storage.updateBalance(newBalance);
        Storage.addFixedDeposit(deposit);
        Storage.addTransaction({
            type: 'sent',
            amount: deposit.amount,
            description: `Fixed Deposit Created - ${tenure} months @ ${rate}%`,
        });
        Storage.addNotification({
            type: 'success',
            title: 'FD Created',
            message: `FD of ₹${deposit.amount} created successfully`,
        });
        updateUI();
        loadScreenContent('savings');
    } else {
        alert('Insufficient balance');
    }
}

function openAddSubscription() {
    const name = prompt('Subscription Name:');
    if (!name) return;

    const amount = prompt('Amount (₹):');
    if (!amount) return;

    const subscription = {
        name: name,
        vendor: name,
        amount: parseFloat(amount),
        frequency: 'monthly',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        startDate: new Date().toISOString(),
        status: 'active',
        category: 'Other',
        autoRenew: true,
    };

    Storage.addSubscription(subscription);
    Storage.addNotification({
        type: 'success',
        title: 'Subscription Added',
        message: `${name} subscription added`,
    });
    updateUI();
    loadScreenContent('subscriptions');
}

function claimReferralReward() {
    const referral = Storage.getReferral();
    if (referral.earnedAmount > 0) {
        const newBalance = Storage.getBalance() + referral.earnedAmount;
        Storage.updateBalance(newBalance);

        referral.earnedAmount = 0;
        Storage.updateReferral(referral);

        Storage.addTransaction({
            type: 'received',
            amount: referral.earnedAmount,
            description: 'Referral Reward Claimed',
        });
        Storage.addNotification({
            type: 'success',
            title: 'Reward Claimed',
            message: `₹${referral.earnedAmount} reward claimed`,
        });
        updateUI();
        loadScreenContent('referral');
    }
}

function handlePayment(e) {
    e.preventDefault();
    alert('Payment feature coming soon!');
}

function handleRequestMoney(e) {
    e.preventDefault();
    alert('Request money feature coming soon!');
}

// Utility Functions
function updateUI() {
    const user = Storage.getUser();
    const balance = Storage.getBalance();
    const notifications = Storage.getNotifications();

    // Update user greeting
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        const hour = new Date().getHours();
        userGreeting.textContent = hour < 12 ? 'Good Morning,' : hour < 18 ? 'Good Afternoon,' : 'Good Evening,';
    }

    // Update user name
    const userName = document.getElementById('userName');
    if (userName) userName.textContent = user.name;

    // Update balance
    updateBalance(balance);

    // Update notification badge
    const badge = document.getElementById('notificationBadge');
    if (badge) badge.textContent = notifications.filter(n => !n.isRead).length;

    // Load recent transactions
    loadRecentTransactions();
}

function updateBalance(balance) {
    const balanceEl = document.getElementById('balanceAmount');
    if (balanceEl) {
        balanceEl.textContent = `₹${balance.toFixed(2)}`;
    }
}

function toggleBalanceVisibility() {
    const balanceAmount = document.getElementById('balanceAmount');
    const toggleBtn = document.getElementById('toggleBalance');
    
    if (balanceAmount.classList.contains('hidden')) {
        balanceAmount.classList.remove('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
        balanceAmount.classList.add('hidden');
        balanceAmount.textContent = '••••••';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
}

function loadRecentTransactions() {
    const container = document.getElementById('recentTransactions');
    if (!container) return;

    const transactions = Storage.getTransactions().slice(0, 3);
    
    container.innerHTML = transactions.map(txn => {
        const txnDate = new Date(txn.date);
        return `
            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon" style="background: ${txn.type === 'received' ? '#d1fae5' : '#fee2e2'}; color: ${txn.type === 'received' ? '#065f46' : '#991b1b'};">
                        <i class="fas fa-${txn.type === 'received' ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <p class="transaction-name">${txn.description}</p>
                        <p class="transaction-time">${txnDate.toLocaleDateString()}</p>
                    </div>
                </div>
                <p class="transaction-amount ${txn.type}">${txn.type === 'received' ? '+' : '-'}₹${txn.amount.toFixed(2)}</p>
            </div>
        `;
    }).join('');
}

function updateHeader(screenName) {
    const header = document.getElementById('mobileHeader');
    let title = 'Google Pay';

    if (screenName !== 'home') {
        const screenTitles = {
            'profile': 'Profile',
            'transfer': 'Send Money',
            'crypto-wallet': 'Crypto Wallet',
            'savings': 'Savings',
            'subscriptions': 'Subscriptions',
            'loan-calculator': 'Loan Calculator',
            'budget': 'Budget',
            'referral': 'Referral Program',
            'history': 'Activity',
        };
        title = screenTitles[screenName] || 'Google Pay';
    }

    const titleEl = header.querySelector('.app-title');
    if (titleEl) titleEl.textContent = title;
}

function toggleMenu() {
    const modal = document.getElementById('menuModal');
    if (modal) {
        modal.classList.toggle('active');
    }
}

function closeMenu() {
    const modal = document.getElementById('menuModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        Storage.clearAll();
        location.reload();
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

function updateCryptoPrice() {
    const wallets = Storage.getCryptoWallets();
    const selectedId = document.getElementById('cryptoSelect').value;
    const wallet = wallets.find(w => w.id === selectedId);

    if (wallet && document.getElementById('cryptoPrice')) {
        document.getElementById('cryptoPrice').value = wallet.currentPrice.toFixed(2);
        
        document.getElementById('cryptoQuantity').addEventListener('input', () => {
            const qty = parseFloat(document.getElementById('cryptoQuantity').value) || 0;
            const total = qty * wallet.currentPrice;
            document.getElementById('cryptoTotal').textContent = total.toFixed(2);
        });
    }
}

function setupScreenEventListeners(screenName) {
    // Specific listeners for screens can be added here if needed
}

// Initialize app when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
