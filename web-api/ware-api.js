// 商品数组
var wares = [{
    id: 1,
    name: '无公害西蓝花',
    description: '绿色无公害，也叫青花菜',
    stock: 990,
    price: 0.23,
    promotion: 1,
    addedTime: new Date(), // 当前时间
    thumbnailUrl: 'images/OnePixelOrange.png',
    imageUrl: 'images/OnePixelOrange.png', // 商品图片
}, {
    id: 2,
    name: '有机上海青',
    description: '阿拉的青菜比肉贵',
    stock: 9,
    price: 12.4,
    promotion: 2,
    addedTime: new Date(), // 当前时间
    thumbnailUrl: 'images/OnePixelOrange.png',
    imageUrl: 'images/OnePixelOrange.png', // 商品图片
}, {
    id: 3,
    name: '本地胡萝卜',
    description: '本地的胡萝卜就是甜',
    stock: 0,
    price: 22,
    promotion: 0,
    addedTime: new Date(), // 当前时间
    thumbnailUrl: 'images/OnePixelOrange.png',
    imageUrl: 'images/OnePixelOrange.png', // 商品图片
}];

/**
 * 商品列表Web API
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 */
function list(req, res) {
    res.json({
        success: true,
        message: '获取成功',
        data: wares
    })
}

/**
 * 商品细节Web API
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 */
function detail(req, res) {
    var wareId = req.query.wareId;
    var ware = wares.find(x => x.id == wareId);

    if (!ware) {
        res.json({
            success: false,
            message: '获取失败，指定商品ID的商品不存在',
            data: null
        });
    }
    else {
        res.json({
            success: true,
            message: '获取成功',
            data: ware
        });
    }
}

// 商品搜索Web API
function search(req, res) {
    var wareName = req.query.wareName;

    res.json({
        success: true,
        message: '搜索成功',
        data: wares.filter(x => x.name.indexOf(wareName) != -1)
    });
}

// 导出商品业务Web API和商品数组
module.exports.list = list;
module.exports.detail = detail;
module.exports.wares = wares;
module.exports.search = search;