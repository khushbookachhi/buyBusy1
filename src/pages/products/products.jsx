import { useLocation } from 'react-router-dom';
import style from './products.module.css';
import { useValue as productValue} from '../../context/productState';
import Card from '../../components/card/Card.jsx';
import { useValue } from '../../context/userAuthentication.jsx';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader.jsx';



function Products(){
  const {products,loading,setPath,handleSearch,handleFilter}=productValue();
  const {user,setUser}=useValue();
  const location=useLocation();
  const [filterState,setFilterState]=useState(0);
  const [checkedState, setCheckedState] = useState({
    "Men's Clothing": false,
    "Women's Clothing": false,
    "Jewelery": false,
    "Electronics": false,
  });

  useEffect(()=>{
    const storedUser=localStorage.getItem('user');
    if(storedUser){
        setUser(storedUser);
    }
},[setUser]);
useEffect(()=>{
  setPath(location.pathname);
  // eslint-disable-next-line
},[setPath]);
useEffect(()=>{
console.log(products);
},[products]);

function changeValue(newVal){
setFilterState(newVal);
}
const handleChange = (event) => {
  const { name, checked } = event.target;
  setCheckedState(prevState => ({
    ...prevState,
    [name]: checked
  }));
};

useEffect(() => {

    handleFilter(filterState,checkedState);
  // eslint-disable-next-line
}, [filterState,checkedState]);
    return(
        <>
        <div className="container-fluid d-flex justify-content-center bg-white">
        {loading?<Loader/>:
       <div className="container-fluid d-flex flex-column align-items-center bg-white">
       <div className={`${style.input} input-group mb-3 my-3`}>
       <input className="form-control form-control-lg text-primary bg-light border border-primary"
        type="search" placeholder="Search By Name"  onChange={(e)=>{handleSearch(e.target.value)}}/>
</div>
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
        
       <div className={style.filterBox}>
        <div className={style.filter}>
          <h5 className='fw-bold text-center'>Filter</h5>
          <label className='fw-bold text-center '>Price:- {filterState}</label>
          <input type="range" min="1" max="100000" step={100} onInput={(e)=>changeValue(e.target.value)}/>
        </div>
        <div className={style.category}>
        <h5 className='fw-bold text-center'>Category</h5>
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