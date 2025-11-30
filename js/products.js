const products = [
  {
    id: 1,
    name: "แจ็คเก็ตยีนส์",
    price: 450,
    sizes: [ "S","M", "L", "XL","XXL"],
    img: "img/id1.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "man",
    category: "other",
    badge:"ใหม่"
  },
  {
    id: 2,
    name: "ชุดเซ็ตไหมพรม+กระโปรง",
    price: 990,
    sizes: ["S","M", "L","XL","XXL"],
    img: "img/id2.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "woman",
    category: "set",
    badge:"ขายดี"
  },
  {
    id: 3,
    name: "เสื้อเชิ้ตน้ำเงิน",
    price: 199,
    sizes: ["S", "M", "L","XL","XXL"],
    img: "img/id3.png",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "man",
    category: "shirt",
    badge:"ขายดี"
  },
   {
    id: 4,
    name: "เดรส",
    price: 490,
    sizes: ["S", "M", "L", "XL","XXL" ],
    img: "img/id4.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "woman",
    category: "other",
    badge:"ใหม่"
  },
   {
    id: 5,
    name: "กางเกงยีนส์",
    price: 399,
    sizes: ["S", "M", "L", "XL","XXL" ],
    img: "img/id5.png",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "man",
    category: "pants",
    badge:"ขายดี"
  },
   {
    id: 6,
    name: "หมวกแก๊ป",
    price: 150,
    sizes: ["Free Size"],
    img: "img/id6.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "hat",
    badge:"ใหม่"
  },
  {
    id: 7,
    name: "คาร์ดิแกน",
    price: 200,
    sizes: [ "Free Size"],
    img: "img/id7.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "other",
    badge:"ขายดี"
  },
  {
    id: 8,
    name: "หมวกเบเร่ต์",
    price: 199,
    sizes: [ "Free Size"],
    img: "img/id8.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "woman",
    category: "hat",
    badge:"Limited"
  },
  {
    id: 9,
    name: "เสื้อยืดแมวเหมียว",
    price: 99,
    sizes: ["S", "M", "L","XL","XXL"],
    img: "img/id9.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "tshirt",
    badge:"ใหม่"
  },
  {
    id: 10,
    name: "เสื้อคอวี",
    price: 80,
    sizes: ["S", "M", "L","XL","XXL"],
    img: "img/id10.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "tshirt",
    badge:"ใหม่"
  },
   {
    id: 11,
    name: "เสื้อbaby tee",
    price: 400,
    sizes: ["S", "M", "L",],
    img: "img/id11.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "tshirt",
    badge:"Limited"
  },
  {
    id: 12,
    name: "เสื้อเชิ้ตดำ",
    price: 199,
    sizes: ["S", "M", "L","XL","XXL"],
    img: "img/id12.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "man",
    category: "shirt",
    badge:"ขายดี"
  },
   {
    id: 13,
    name: "เสื้อเชิ้ตลาย",
    price: 199,
    sizes: ["S", "M", "L","XL","XXL"],
    img: "img/id13.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "man",
    category: "shirt",
    badge:"ขายดี"
  },
   {
    id: 14,
    name: "กางเกงขาสั้น",
    price: 159,
    sizes: ["S", "M", "L", "XL" ],
    img: "img/id14.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "women",
    category: "pants",
    badge:"ขายดี"
   },

   {
    id: 15,
    name: "กางเกงยีนส์ขาสั้น",
    price: 699,
    sizes: ["S", "M", "L", "XL","XXL" ],
    img: "img/id15.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "pants",
    badge:"ขายดี"
   },
   {
    id: 16,
    name: "Sweetra ผู้หญิง ลายทาง เสื้อท็อปคล้องคอ และ ยาว กางเกง เซ็ต",
    price: 990,
    sizes: ["S","M", "L"],
    img: "img/id16.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: "woman",
    category: "set",
    badge:"ใหม่"
   },
 {
    id: 17,
    name: "ชุดเต้นSet เสื้อแจ็คเก็ตแขนยาวกางเกงขายาวสีเงิน ใส่ได้ทั้งชายและหญิง",
    price: 1990,
    sizes: ["S","M", "L","XL","XXL"],
    img: "img/id17.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "set",
    badge:"Limited"
   },
    {
    id: 18,
    name: "หมวกฤดูหนาว",
    price: 199,
    sizes: [ "Free Size"],
    img: "img/id18.jpg",
    description: "สวมใส่สบาย สัมผัสเนียนนุ่ม ดูแลรักษาง่าย",
    gender: ["man","woman"],
    category: "hat",
    badge:"Limited"
  },
   
   
  
];
