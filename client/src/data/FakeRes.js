// import { Redirect } from 'react-router-dom'
// 購物車要求：品牌名稱、顏色、尺寸、商品圖片路徑、庫存、品名、單價、數量

let FakeRes = JSON.parse(localStorage.getItem('cartList'))
// [
//   {
//     id: 1,
//     name: 'Reverse Weave Crew, Script Logo', //品名
//     brand: 'Champion', //品牌名稱
//     image:
//       '/images/product/Champion/Reverse_Weave_Crew_Script_Logo/Reverse_Weave_Crew_Script_Logo_B01.jpg', //商品圖片路徑
//     price: 4590, //單價
//     color: '紅色',
//     size: 'L',
//   },
//   {
//     id: 2,
//     name: 'Reverse Weave Tie Dye Hoodie',
//     brand: 'Champion',
//     image:
//       '/images/product/Champion/Reverse_Weave_Tie_Dye_Hoodie/Reverse_Weave_Tie_Dye_Hoodie_P01.jpg',
//     price: 3500,
//     color: '黑色',
//     size: 'S',
//   },
//   {
//     id: 3,
//     name: 'Campus Fleece Mock Neck Crew, Embroidered Logo',
//     brand: 'Champion2',
//     image:
//       '/images/product/Champion/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo_O01.jpg',
//     price: 21000,
//     color: '白色',
//     size: 'M',
//   },
// {
//   id: 4,
//   name: 'Cotton Jersey Shorts with Pockets',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Cotton_Jersey_Shorts_with_Pockets/Cotton_Jersey_Shorts_with_Pockets_B01.jpg',
//   price: 28000,
// },
// {
//   id: 5,
//   name: 'WHEN LIFE GIVES YOU LEMONS',
//   brand: 'Champion',
//   image:
//     '/images/product/PALACE/WHEN_LIFE_GIVES_YOU_LEMONS/WHEN_LIFE_GIVES_YOU_LEMONS_01.jpg',
//   price: 4590,
// },
// {
//   id: 6,
//   name: '2020 GOLF SHIRT 01',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_01/2020_GOLF_SHIRT_01.jpg',
//   price: 34590,
// },
// {
//   id: 7,
//   name: '2020 GOLF SHIRT 02',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_02/2020_GOLF_SHIRT_02.jpg',
//   price: 83,
// },
// {
//   id: 8,
//   name: '2020 GOLF SHIRT 03',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_03/2020_GOLF_SHIRT_03.jpg',
//   price: 4590,
// },
// {
//   id: 9,
//   name: '2020 GOLF TROUSERS',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Reverse_Weave_Crew_Script_Logo/Reverse_Weave_Crew_Script_Logo_B01.jpg',
//   price: 4590,
// },
// {
//   id: 10,
//   name: 'SECURITY MULTI LOGO PANTS',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Reverse_Weave_Tie_Dye_Hoodie/Reverse_Weave_Tie_Dye_Hoodie_P01.jpg',
//   price: 4590,
// },
// {
//   id: 11,
//   name: 'MILITARY BAPE STA MID',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo_O01.jpg',
//   price: 4590,
// },
// {
//   id: 12,
//   name: 'STERING SILVER BRACELET',
//   brand: 'Champion',
//   image:
//     '/images/product/PALACE/WHEN_LIFE_GIVES_YOU_LEMONS/WHEN_LIFE_GIVES_YOU_LEMONS_01.jpg',
//   price: 4590,
// },
// {
//   id: 13,
//   name: 'MAD FACE SILVER NAVAJO RING',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_02/2020_GOLF_SHIRT_02.jpg',
//   price: 6590,
// },
// {
//   id: 14,
//   name: 'CRYSTAL STONE NATIVE PATTERN TEE',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_03/2020_GOLF_SHIRT_03.jpg',
//   price: 4590,
// },
// {
//   id: 15,
//   name: 'CARGO PANTS',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_01/2020_GOLF_SHIRT_01.jpg',
//   price: 590,
// },
// {
//   id: 16,
//   name: 'A BATHING APE DOUBLE KNIT JOGGER PANTS',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo_O01.jpg',
//   price: 4590,
// },
// {
//   id: 17,
//   name: '2020 GOLF SHIRT 01',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_01/2020_GOLF_SHIRT_01.jpg',
//   price: 452290,
// },
// {
//   id: 18,
//   name: '2020 GOLF SHIRT 02',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_02/2020_GOLF_SHIRT_02.jpg',
//   price: 34590,
// },
// {
//   id: 19,
//   name: '2020 GOLF SHIRT 03',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_03/2020_GOLF_SHIRT_03.jpg',
//   price: 145940,
// },
// {
//   id: 20,
//   name: '2020 GOLF SHIRT 02',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_02/2020_GOLF_SHIRT_02.jpg',
//   price: 9590,
// },
// {
//   id: 21,
//   name: '2020 GOLF SHIRT 03',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_03/2020_GOLF_SHIRT_03.jpg',
//   price: 44590,
// },
// {
//   id: 22,
//   name: '2020 GOLF TROUSERS',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Reverse_Weave_Crew_Script_Logo/Reverse_Weave_Crew_Script_Logo_B01.jpg',
//   price: 4590,
// },
// {
//   id: 23,
//   name: 'SECURITY MULTI LOGO PANTS',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Reverse_Weave_Tie_Dye_Hoodie/Reverse_Weave_Tie_Dye_Hoodie_P01.jpg',
//   price: 4590,
// },
// {
//   id: 24,
//   name: 'MILITARY BAPE STA MID',
//   brand: 'Champion',
//   image:
//     '/images/product/Champion/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo/Campus_Fleece_Mock_Neck_Crew_Embroidered_Logo_O01.jpg',
//   price: 4590,
// },
// {
//   id: 25,
//   name: 'STERING SILVER BRACELET',
//   brand: 'Champion',
//   image:
//     '/images/product/PALACE/WHEN_LIFE_GIVES_YOU_LEMONS/WHEN_LIFE_GIVES_YOU_LEMONS_01.jpg',
//   price: 2590,
// },
// {
//   id: 26,
//   name: 'MAD FACE SILVER NAVAJO RING',
//   brand: 'Champion',
//   image: '/images/product/GOLF/2020_GOLF_SHIRT_02/2020_GOLF_SHIRT_02.jpg',
//   price: 4590,
// },
// ]
export default FakeRes
