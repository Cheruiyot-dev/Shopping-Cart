const SearchComponent = ({ searchProduct, productSearch }) => {
    return <>
    <h3 className="font-sans text-lg font-medium text-gray-950  flex justify-center items-center my-4">Shopping Cart</h3>
    <div className="flex justify-center items-center my-4">
        <input type="text"
        placeholder="Search products"
        value={searchProduct} 
        // searchProduct is array containing cart items
        onChange={productSearch}
        className="px-2"/>
    </div>
    </>
}

export default SearchComponent;