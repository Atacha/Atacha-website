import { useLazyQuery } from "@apollo/client"
import debounce from "lodash.debounce"
import { resetIdCounter, useCombobox } from "downshift"
import gql from "graphql-tag"

import { useRouter } from "next/dist/client/router"
import styles from "../assets/styles/components/SearchBar.module.scss"

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: { OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }] }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const SearchBar: React.FC = () => {
  const router = useRouter()
  const [findItems, { loading, data, error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: "no-cache",
  })
  const items = data?.searchTerms || []
  const findItemsButChill = debounce(findItems, 350)
  resetIdCounter()
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      })
    },
    onSelectedItemChange({ selectedItem }: any) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      })
    },
    itemToString: (item: any) => item?.name || "",
  })
  return (
    <div className={styles.searchBar} {...getComboboxProps()}>
      <input
        {...getInputProps({
          type: "search",
          placeholder: "Enecuetra lo que deseas...",
          id: "search",
          className: loading ? "loading" : "",
        })}
      />
      <button>
        <i className="fas fa-search"></i>
      </button>
      <div {...getMenuProps()}>
        {isOpen &&
          items.map((item: any, index: any) => (
            <p {...getItemProps({ item })} key={item.id} highlighted={index === highlightedIndex}>
              <img src={item.photo.image.publicUrlTransformed} alt={item.name} width="50" />
              {item.name}
            </p>
          ))}
        {isOpen && !items.length && !loading && (
          <p>Perdoon, No encontramos lo que buscas: {inputValue}</p>
        )}
      </div>
    </div>
  )
}

export default SearchBar
