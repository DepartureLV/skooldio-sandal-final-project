import { UserContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DropdownRootByGender(input) {
  const { categories } = useContext(UserContext);
  const gender = capitalizeFirstLetter(input);

  return (
    <div class="dropdown dropdown-start">
      <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
        <h2 className="font-light text-md">{gender}</h2>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] p-2 shadow text-secondary bg-base-100 rounded-none w-52 mt-4 flex flex-col"
      >
        {categories.map((item, id) => {
          if (item.permalink.toUpperCase().includes(gender.toUpperCase())) {
            return (
              <Link
                to={`/Products/${item.name}/${item.permalink}`}
                className="py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-primary-700 active:text-primary active:bg-base-100"
              >
                {item.name}
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
}