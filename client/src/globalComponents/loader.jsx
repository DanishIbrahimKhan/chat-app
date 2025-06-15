import React from 'react';
import Lottie from 'react-lottie';
import loaderLotify from '@/assets/fastLoader.json';
import useAppStore from '@/store/store';

function Loader() {
  const loading = useAppStore((state) => state.loading);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderLotify,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log("loading is running", loading)
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

export default Loader;
