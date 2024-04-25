import { useLocation } from 'react-router-dom';
import style from './products.module.css';
import { useValue as productValue} from '../../context/productState';
import Card from '../../components/card/Card.jsx';
import { useValue } from '../../context/userAuthentication.jsx';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader.jsx';



function Products(){
  // Accessing products state, loading state, and related functions from product state context
  const { products, loading, setPath, handleSearch, handleFilter } = productValue();
  // Accessing user data and related functions from user authentication context
  const { user, setUser } = useValue();
  // Accessing current location from react-router-dom
  const location = useLocation();
  // State for managing the filter value
  const [filterState, setFilterState] = useState(0);
  // State for managing the checked categories in the filter
  const [checkedState, setCheckedState] = useState({
    "Men's Clothing": false,
    "Women's Clothing": false,
    "Jewelery": false,
    "Electronics": false,
  });


  useEffect(()=>{
     // Retrieve user data from local storage if available
    const storedUser=localStorage.getItem('user');
    if(storedUser){
        setUser(storedUser);
    }
},[setUser]);
useEffect(()=>{
   // Update the current path when location changes
  setPath(location.pathname);
  // eslint-disable-next-line
},[setPath]);
useEffect(()=>{
console.log(products);
},[products]);

 // Function to update filter value
function changeValue(newVal){
setFilterState(newVal);
}
  // Function to handle checkbox change in the filter
const handleChange = (event) => {
  const { name, checked } = event.target;
  setCheckedState(prevState => ({
    ...prevState,
    [name]: checked
  }));
};

useEffect(() => {
 // Call handleFilter function when filter state or checked categories change
    handleFilter(filterState,checkedState);
  // eslint-disable-next-line
}, [filterState,checkedState]);
    return(
        <>
        <div className="container-fluid d-flex justify-content-center bg-white">
        {loading?<Loader/>:
       <div className="container-fluid d-flex flex-column align-items-center bg-white">
          {/* Input field for searching products */}
       <div className={`${style.input} input-group mb-3 my-3`}>
       <input className="form-control form-control-lg text-primary bg-light border border-primary"
        type="search" placeholder="Search By Name"  onChange={(e)=>{handleSearch(e.target.value)}}/>
</div>
{/* Container for displaying products */}
        <div className={`${style.product_container} d-flex py-5 my-2 bg-white`}>
          { products.map((product,index)=>{
               return (
                <div key={index}>
                  <Card
               product={product}
                userId={user}
                index={index}
                />
                </div>
                
               )
          })}
 
        </div>
          {/* Filter box for filtering products */}
       <div className={style.filterBox}>
        <div className={style.filter}>
          <h5 className='fw-bold text-center'>Filter</h5>
          <label className='fw-bold text-center '>Price:- {filterState}</label>
            {/* Range input for selecting price range */}
          <input type="range" min="1" max="100000" step={100} onInput={(e)=>changeValue(e.target.value)}/>
        </div>
        <div className={style.category}>
        <h5 className='fw-bold text-center'>Category</h5>
          {/* Checkboxes for selecting categories */}
      <div className='text-left px-2'>
      {Object.keys(checkedState).map((optionKey,index) => (
        <div  key={index}>
          <label>
          <input
            type="checkbox"
            name={optionKey}
            checked={checkedState[optionKey]}
            onChange={handleChange}
          /> {optionKey}
        </label> 
        </div>
        
      ))}
     
      </div>
      
        </div>
       </div>
       </div>}
        </div>
     
        </>
    )
}
export default Products;