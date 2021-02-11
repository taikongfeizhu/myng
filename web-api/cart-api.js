var wareApi = require('./ware-api'); // 导入商品业务Web API模块
var customerApi = require('./customer-api'); // 导入客户业务Web API模块
var cartWares = []; // 购物车商品数组

// 添加商品到购物车
function addWare(req, res) {
    // 验证用户是否已登录
    var phone = getAuthPhone(req);
    if (!phone) {
        res.json({
            success: false,
            message: '请先登录'
        });
        return;
    }

    // 获取请求参数
    var wareId = req.body.wareId;
    var count = req.body.count;

    // 查找仓库中的目标商品
    var ware = wareApi.wares.find(x => x.id == wareId);
    if (!ware) {
        res.json({
            success: false,
            message: '指定的商品不存在'
        });
        return;
    }

    // 检查库存量
    if (count > ware.stock) {
        res.json({
            success: false,
            message: '库存不足'
        });
        return;
    }

    // 查找购物车中的目标商品，并查找失败时创建购物车商品
    var cartWare = cartWares.find(x => x.id == wareId);
    if (!cartWare) {
        cartWare = {
            id: cartWares.length == 0 ? 1 : cartWares.reduce((p, c) => p.id > c.id ? p : c).id + 1,
            count: 0,
            price: ware.price,
            thumbnailUrl: ware.thumbnailUrl,
            wareId: ware.id,
            wareName: ware.name
        };

        cartWares.push(cartWare);
    }

    // 再次检查库存量
    if (cartWare.count + count > ware.stock) {
        res.json({
            success: false,
            message: '库存不足'
        });
        return;
    }

    // 增加购物车商品数量，并返回增加成功结果
    cartWare.count += count;
    res.json({
        success: true,
        message: '添加成功',
        data: cartWares.map(x => x.count).reduce((p, c) => p + c)
    });
}

// 获取购物车商品数组
function getWares(req, res) {
    // 验证用户是否已登录
    var phone = getAuthPhone(req);
    if (!phone) {
        res.json({
            success: false,
            message: '请先登录'
        });
        return;
    }

    // 返回购物车商品数组
    res.json({
        success: true,
        message: '获取成功',
        data: cartWares
    });
}

// 删除购物车商品
function removeWare(req, res) {
    // 验证用户是否已登录
    var phone = getAuthPhone(req);
    if (!phone) {
        res.json({
            success: false,
            message: '请先登录'
        });
        return;
    }

    // 查找要删除的购物车商品
    var cartWareId = req.body.id;
    var index = cartWares.findIndex(x => x.id == cartWareId);
    if (index == -1) {
        res.json({
            success: false,
            message: '指定的购物车商品不存在'
        });
        return;
    }

    // 删除目标购物车商品
    cartWares.splice(index, 1);
    res.json({
        success: true,
        message: '删除成功',
        data: cartWares.length == 0 ? 0 : cartWares.map(x => x.count).reduce((p, c) => p + c)
    });
}

// 更新购物车商品数量
function updateWareCount(req, res) {
    // 验证用户是否已登录
    var phone = getAuthPhone(req);
    if (!phone) {
        res.json({
            success: false,
            message: '请先登录'
        });
        return;
    }

    // 获取请求参数
    var wareId = req.body.wareId;
    var count = req.body.count;

    // 查找目标商品和目标购物车商品
    var ware = wareApi.wares.find(x => x.id == wareId);
    var cartWare = cartWares.find(x => x.wareId == wareId);
    if (!ware || !cartWare) {
        res.json({
            success: false,
            message: '购物车商品不存在'
        });
        return;
    }

    // 判断库存量
    if (count > ware.stock || count < 1) {
        res.json({
            success: false,
            message: '库存不足'
        });
        return;
    }

    // 更新库存量，并返回更新成功结果
    cartWare.count = count;
    res.json({
        success: true,
        message: '更新成功',
        data: cartWares.map(x => x.count).reduce((p, c) => p + c)
    });
}

// 获取购物车商品总数
function getTotalCount(req, res) {
    // 验证用户是否已登录
    var phone = getAuthPhone(req);
    if (!phone) {
        res.json({
            success: false,
            message: '请先登录'
        });
        return;
    }

    // 计算商品总数
    var totalCount = cartWares.length == 0 ? 0 : cartWares.map(x => x.count).reduce((p, c) => p + c);
    res.json({
        success: true,
        message: '获取成功',
        data: totalCount
    });
}

// 获取登录客户的手机号码，若用户未登录，那么返回null
function getAuthPhone(req) {
    // 从客户端Cookies中读取加密的手机号码
    if (!req.headers.cookie) {
        return null;
    }
    var cookies = req.headers.cookie.split(';').map(x => x.trim());
    var phoneCookie = cookies.find(x => x.indexOf('auth=') == 0);
    if (!phoneCookie) {
        return null;
    }
    var encryptedPhone = phoneCookie.split('=')[1];
    if (!encryptedPhone) {
        return null;
    }

    // 获取解密算法
    var crypto = require('crypto');
    var secret = 'iJ0vR=keBua&gWyl4F';
    var decipher = crypto.createDecipher('aes256', secret);

    // 尝试解密加密后的手机号码，并返回解密后的手机号码
    try {
        decipher.update(encryptedPhone, 'hex', 'utf8');
        var phone = decipher.final('utf8');

        // 检查用户是否已被注销
        var index = customerApi.customers.findIndex(x => x.phone == phone);
        if (index == -1) {
            return null;
        }

        return phone;
    }
    catch (ex) {
        return null;
    }
}

// 导出购物车业务Web API
module.exports.addWare = addWare;
module.exports.getWares = getWares;
module.exports.removeWare = removeWare;
module.exports.updateWareCount = updateWareCount;
module.exports.getTotalCount = getTotalCount;