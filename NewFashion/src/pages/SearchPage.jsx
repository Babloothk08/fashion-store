function SearchPage({ searchProduct }) {
  if (!searchProduct || searchProduct.length === 0) {
    return <p className="mt-24 text-center">No Product Found</p>;
  }
  

  return (
    <div className="mt-24 grid grid-cols-3 gap-4 px-6">
      {searchProduct.map((item) => (
        <div key={item._id} className="border p-3">
          <img src={item.avatar} alt={item.name} width="150" />
          <h3>{item.name}</h3>
          <p>{item.heading}</p>
        </div>
      ))}
    </div>
  );
}
export default SearchPage