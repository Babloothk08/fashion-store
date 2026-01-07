import { Link } from "react-router-dom";

function SearchPage({ searchProduct }) {
  if (!searchProduct || searchProduct.length === 0) {
    return <p className="mt-24 text-center text-lg">No Product Found</p>;
  }

  return (
    <div className="mt-24 px-4 sm:px-6">
      <div
        className="
        grid 
        grid-cols-2
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
      "
      >
        {searchProduct.map((item) => (
          <Link to={`/detailPage/${item._id}`}>
          <div
            key={item._id}
            className="
              p-4 
              rounded-lg 
              shadow-sm 
              hover:shadow-lg 
              transition 
              flex 
              flex-col 
              items-center 
              text-center
              cursor-pointer
            "
          >
            <img
              src={item.avatar}
              alt={item.name}
              className="w-36 h-40 object-cover mb-3"
            />
            <p className="text-sm text-gray-600 mb-1">{item.heading}</p>
            <h3 className="font-semibold text-base">Price : ₹{item.price}</h3>
          </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}

export default SearchPage;
