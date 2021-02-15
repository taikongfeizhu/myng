var customers = [

];

/**
 * 注册Web API
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 */
function signUp(req, res) {
    // 获取客户端通过请求体提交的参数
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    var email = req.body.email;

    // 验证输入的合法性
    if (!name || !phone || !password) {
        res.json({ success: false, message: '注册失败，未同时提供姓名、手机号码和密码' });
        return;
    }

    // 防止添加重复用户
    var existingCustomer = customers.find(x => x.phone === phone);
    if (existingCustomer != undefined) {
        res.json({ success: false, message: '注册失败，此手机号码已被使用' });
        return;
    }

    // 设置新客户的ID
    var id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

    // 添加客户
    customers.push({ id, name, phone, password, email });

    // 向客户端返回注册成功结果
    res.json({ success: true, message: '注册成功' });
}

/**
 * 登录Web API
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 */
function logIn(req, res) {
    // 获取客户端通过请求体提交的参数
    var phone = req.body.phone;
    var password = req.body.password;

    // 获取目标客户
    var targetCustomer = customers.find(x => x.phone === phone && x.password === password);
    if (targetCustomer === undefined) {
        res.json({ success: false, message: '登录失败，手机号码或密码错误' });
        return;
    }

    // 获取加密的手机号码，并将其保存到客户端Cookie中
    var encryptedPhone = encryptPhone(phone);
    var shouldPersist = req.query.shouldPersist;
    if (shouldPersist === 'true') {
        res.cookie('auth', encryptedPhone, { httpOnly: true, maxAge: 7 * 24 * 3600 * 1000 });
    }
    else {
        res.cookie('auth', encryptedPhone, { httpOnly: true });
    }

    // 向客户端返回登录成功结果
    res.json({ success: true, message: '登录成功' });
}

// 登录客户姓名获取Web API
function getAuthName(req, res) {
    // 从客户端Cookies中读取加密的手机号码
    if (!req.headers.cookie) {
        res.json({
            success: false,
            message: '客户未登录'
        });
        return;
    }
    var cookies = req.headers.cookie.split(';').map(x => x.trim());
    var phoneCookie = cookies.find(x => x.indexOf('auth=') == 0);
    if (!phoneCookie) {
        res.json({
            success: false,
            message: '客户未登录'
        });
        return;
    }
    var encryptedPhone = phoneCookie.split('=')[1];
    if (!encryptedPhone) {
        res.json({
            success: false,
            message: '客户未登录'
        });
        return;
    }

    // 获取解密算法
    var crypto = require('crypto');
    var secret = 'iJ0vR=keBua&gWyl4F';
    var decipher = crypto.createDecipher('aes256', secret);

    // 尝试解密加密的手机号码，并返回与这个手机号码相关的客户的姓名
    try {
        decipher.update(encryptedPhone, 'hex', 'utf8');
        var phone = decipher.final('utf8');

        var customer = customers.find(x => x.phone == phone);
        if (!customer) {
            res.json({
                success: false,
                message: '客户不存在或已注销'
            });
            return;
        }

        res.json({
            success: true,
            message: '获取成功',
            data: customer.name
        });
    }
    catch (ex) {
        res.json({
            success: false,
            message: '发生异常'
        });
    }
}

/**
 * 退出登录
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 */
function logOut(req, res) {
    res.clearCookie('auth');
    res.json({
        success: true,
        message: '退出成功'
    });
}

/**
 * 加密手机号码
 * @param {*} phone 手机号码
 */
function encryptPhone(phone) {
    var crypto = require('crypto');
    var secret = 'iJ0vR=keBua&gWyl4F';
    var cipher = crypto.createCipher('aes256', secret);

    cipher.update(phone, 'utf8', 'hex');
    var encryptedPhone = cipher.final('hex');
    return encryptedPhone;
}

module.exports.signUp = signUp; // 导出注册Web API
module.exports.logIn = logIn; // 导出登录Web API
module.exports.getAuthName = getAuthName; // 导出登录用户姓名获取Web API
module.exports.logOut = logOut; // 导出退出登录Web API
module.exports.customers = customers; // 导出所有客户
