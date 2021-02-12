export class Ware {
  id: number;           // ID
  name: string;         // 商品名
  description: string;  // 描述
  stock: number;        // 库存量
  price: number;        // 价格
  promotion: number;    // 促销标记：1，满额减价；2，有买有赠；3，满额返券；其他数字，不促销
  addedTime: Date;      // 上架时间
  thumbnailUrl: string; // 缩略图URL
  imageUrl: string;     // 正常图片URL
}
