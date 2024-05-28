import { useState } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";
import ShowProductComponent from "./components/ShowProductComponent";
import UserCartComponent from "./components/UserCartComponent";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "HP Pavilion Laptop",
    price: 650,
    image:
      "https://www.saruk.co.ke/_next/image?url=https%3A%2F%2Fsaruk-images.s3.ap-south-1.amazonaws.com%2F53061696236569.jpg&w=750&q=75",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 799,
    image:
      "hhttps://www.phoneplacekenya.com/wp-content/uploads/2021/03/Samsung-Galaxy-S21-FE-a.jpg",
  },
  {
    id: 3,
    name: "Lenovo ThinkPad",
    price: 850,
    image:
      "https://cdn.vooka.co.ke/vooka/products/lenovo-thinkpad-e14-12th-gen-core-i5-computer-store-kenya16-08-2023-1692191998.webp",
  },
  {
    id: 4,
    name: "Google Pixel 6",
    price: 599,
    image:
      "https://www.zdnet.com/a/img/resize/d67d91282bde4701e874a1f8eccfc513b4c3fb3a/2021/10/19/6ba6c306-d808-45c2-936f-5662b42b1305/google-pixel-6-and-6-pro-1.jpg?auto=webp&fit=crop&height=1200&width=1200",
  },
  {
    id: 5,
    name: "Asus ZenBook",
    price: 700,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.asus.com%2Fus%2Flaptops%2Ffor-home%2Fzenbook%2Fasus-zenbook-14-ux431%2F&psig=AOvVaw2WzWnB_RR4nT5PrCQ1o1UT&ust=1717018847474000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOD5geensYYDFQAAAAAdAAAAABAE",
  },
];

function App() {
  const [products, setProduct] = useState<Product[]>(allProducts);
  const [productsCart, setproductsCart] = useState<CartItem[]>([]);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [open, setOpen] = useState(false);

  const openCartModal = () => {
    setOpen(true);
  };

  const closeCartModal = () => {
    setOpen(false);
  };

  const addProductToCart = (productItem: Product) => {
    const existingProduct = productsCart.find(
      (item) => item.product.id == productItem.id
    );
    if (existingProduct) {
      const latestcartUpdate = productsCart.map((item) =>
        item.product.id === productItem.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      setproductsCart(latestcartUpdate);
    } else {
      setproductsCart([...productsCart, { product: productItem, quantity: 1 }]);
    }
  };

  const deleteProductFromCart = (productItem: Product) => {
    const updatedCart = productsCart.filter(
      (item) => item.product.id !== productItem.id
    );
    setproductsCart(updatedCart);
  };

  const totalAmount = () => {
    return productsCart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const productSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };

  const filterProducts = products.filter((product) =>
    product.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())
  );

  return (
    <div>
      <SearchComponent
        searchProduct={searchProduct}
        productSearch={productSearch}
      />
      <main>
        <ShowProductComponent
          products={products}
          filterProducts={filterProducts}
          addProductToCart={addProductToCart}
          openCartModal={openCartModal}
        />
        <UserCartComponent
          setProduct={setProduct}
          productsCart={productsCart}
          deleteProductFromCart={deleteProductFromCart}
          totalAmount={totalAmount}
          setproductsCart={setproductsCart}
          open={open}
          closeCartModal={closeCartModal}
        />
      </main>
    </div>
  );
}

export default App;
