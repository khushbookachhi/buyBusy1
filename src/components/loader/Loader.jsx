import Spinner from 'react-spinner-material';

// Define Loader component as a functional component
export default function Loader() {
  return (
      <>
          {/* Wrapper div with margin and background color */}
          <div className='my-5 bg-white'>
              {/* Render the Spinner component */}
              <Spinner radius={120} color={"#0d6efd"} stroke={6} visible={true} />
          </div>
      </>
  );
}