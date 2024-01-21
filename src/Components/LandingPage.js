import React, { useState, useCallback, useEffect } from 'react';
import fuji from '../assets/mount-fuji.svg';
import search from '../assets/search.png';
import './LandingPage.module.css';

const LandingPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSearch = useCallback(async () => {
        if (searchInput.length > 2) {
            try {
                const apiKey = '41939823-c28b0fd5d5647afba89ecac7c';
                const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchInput}&image_type=photo`);
                const data = await response.json();
                console.log(data);
                if (data.hits) {
                    setSearchResults(data.hits);
                }
            } catch (error) {
                console.error('Error fetching data from Pixabay API:', error);
            }
        }
    }, [searchInput]);

    useEffect(() => {
        handleSearch(); 
    }, [searchInput, handleSearch]);

   
    const openImageDetail = (index) => {
        setSelectedImage(searchResults[index]);
    };

    const closeImageDetail = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className='w-screen h-screen bg-cover bg-center flex-col justify-center items-center ' style={{ backgroundImage: `url(${fuji})` }}>
                <div className='w-screen h-auto flex flex-col gap-10 pt-10'>
                    <div className='flex justify-between mx-auto p-2 bg-[#D9D9D94D] items-center rounded-md w-[90%]'>
                        <h1 className='text-white text-sm font-medium'>Homepage</h1>
                        <div className='flex items-center gap-3'>
                            <h1 className='text-white text-sm font-medium'>Login</h1>
                            <button className='text-white text-sm font-medium rounded-md px-1 py-1 border-2 border-white'>Create Account</button>
                        </div>
                    </div>
                    <div className='mx-auto w-[80%]'>
                        <h1 className='text-white text-xl font-semibold '>Discover over 2,000,000 free Stock Images</h1>
                    </div>
                    <form className='mx-auto w-[80%] flex flex-col gap-5' onSubmit={(e) => e.preventDefault()}>
                        <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className='bg-[#D9D9D94D] w-5/6 flex justify-between absolute h-10 px-10 py-2 rounded-md text-white' placeholder='Search' />
                        <div className='flex justify-between p-2'>
                            <div className='flex items-center gap-2'>
                                <img className='w-3 h-4 pt-1' src={search} alt='' />
                                <div className='text-white'>|</div>
                            </div>
                            <button
                                type='button'
                                className='text-white px-3 rounded-lg border-2 text-sm border-white'
                                onClick={() => handleSearch()} 
                            >GO!</button>
                        </div>

                        {/* </div> */}
                        <div className='bg-[#D9D9D94D] w-[80%] px-2 mx-auto rounded-md py-2'>
                            <h1 className='text-xs text-white flex'><p className='font-semibold'>Trending:</p> flowers, love, forest, river</h1>
                        </div>
                    </form>
                    {
                    selectedImage && (
                    <div className="modal">
                        <div className="modal-content flex">
                            <img src={selectedImage.largeImageURL} alt="" />
                            <button onClick={closeImageDetail}>Close</button>
                        </div>
                    </div>
                )
            }
                    {
                        searchResults && searchInput.length > 2 &&
                        <div className='flex flex-wrap w-[100vw] gap-5 h-[20rem] overflow-x-hidden overflow-y-scroll'>
                            {
                                searchResults.map((result, index) => (
                                    <div key={index} className='w-28 h-40 mx-auto mt-5 flex flex-col gap-2'>
                                        <div>
                                        <img className='bg-cover bg-center w-full h-28' src={result.largeImageURL} alt='' onClick={() => openImageDetail(index)} />
                                        </div>
                                        <div className='flex gap-2 flex-wrap'>
                                            <div className='text-white text-sm bg-[#D9D9D94D] px-1 border-white'>{result.tags.split(',')[0]}</div>
                                            <div className='text-white text-sm bg-[#D9D9D94D] px-1 border-white'>{result.tags.split(',')[1]}</div>
                                            <div className='text-white text-sm bg-[#D9D9D94D] px-1 border-white'>{result.tags.split(',')[2]}</div>
                                            <div className='text-white text-sm bg-[#D9D9D94D] px-1 border-white'>{result.tags.split(',')[3]}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default LandingPage