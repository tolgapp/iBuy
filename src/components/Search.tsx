type Search = {
    value: string
}

const Search: React.FC<Search> = ({value}) => {

  return (
    <div className="search">
        <input type="text" name="search" id="search" value={value} onChange={(e) => e.target.value} />
    </div>
  )
}
export default Search