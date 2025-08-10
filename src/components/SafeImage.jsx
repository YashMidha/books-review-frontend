import React, { useState, useEffect } from "react";

const PLACEHOLDERS = [
  "/images/placeholder_book_3.png",
  "/images/placeholder_book_9.png",
  "/images/placeholder_book_10.png",
];

const getRandomPlaceholder = () => {
  const idx = Math.floor(Math.random() * PLACEHOLDERS.length);
  return PLACEHOLDERS[idx];
};

const SafeImage = ({
  onClick = () => {},
  srcList = [],
  alt = "",
  minWidth = 50,
  minHeight = 50,
  className = "",
  loading = "lazy",
}) => {
  const images = srcList.length > 0 ? srcList: getRandomPlaceholder();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(images);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentSrc(srcList[0] || getRandomPlaceholder());
  }, [srcList]);

  const onError = () => {
    if (currentIndex < srcList.length - 1) {
      setCurrentIndex((i) => i + 1);
      setCurrentSrc(srcList[currentIndex + 1]);
    } else {
      setCurrentSrc(getRandomPlaceholder());
    }
  };

  const onLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth < minWidth || naturalHeight < minHeight) {
      onError();
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={onError}
      onLoad={onLoad}
      className={className}
      loading={loading}
      onClick={onClick}
    />
  );
};

export default SafeImage;
