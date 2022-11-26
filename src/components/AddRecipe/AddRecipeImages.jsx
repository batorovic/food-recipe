import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

export const AddRecipeImages = (props) => {
  const { file, setFile, setCoverImageIndex } = props;
  // const [file, setFile] = useState([]);
  // const [coverImageIndex, setCoverImageIndex] = useState(0);
  // const [file, setFile] = useState({
  //   file: {},
  //   fileUrl: "",
  // });

  const removeElement = (index) => {
    const newFile = file.filter((_, i) => i !== index);
    setFile(newFile);
  };

  return (
    <Wrapper>
      <h2>Recipe Photos</h2>
      <AddPhoto>
        <div className="add-photo-inner">
          <label htmlFor="fileRecipe">
            <MdOutlineAddPhotoAlternate size={25} />
            Add Photo
          </label>
          <input
            id="fileRecipe"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setFile([...file, e.target.files[0]]);
              }
            }}
          />
        </div>
      </AddPhoto>
      {file.length === 0 && (
        <div className="information">Remember to add photos</div>
      )}
      <ImageWrapper>
        {file.map((item, index) => {
          return (
            <ImageCard key={index}>
              <figure>
                <div style={{ marginBottom: "-30px" }}>
                  <img
                    src={(window.URL || window.webkitURL).createObjectURL(item)}
                    width={140}
                    height={140}
                    alt="images"
                    // onClick={() => console.log(index)}
                  />
                  <div
                    className="deleteIcon"
                    onClick={() => {
                      removeElement(index);
                    }}
                  >
                    <RiDeleteBinLine color="red" size={20} />
                  </div>
                </div>

                <figcaption>
                  <input
                    type="radio"
                    name="radAnswer"
                    onClick={() => setCoverImageIndex(index)}
                  />
                  <label htmlFor="inputBanner">Cover Photo</label>
                </figcaption>
              </figure>
            </ImageCard>
          );
        })}
      </ImageWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 2rem;

  .information {
    color: #ffff;
    padding: 1rem;
    background: linear-gradient(to left, #f27121, #e94057);
    width: 500px;
    margin-left: 55px;
    margin-top: 25px;
    font-size: small;
    border-radius: 5px;
  }
`;
const ImageWrapper = styled.div`
  margin-left: 3rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  position: relative;

  figure {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
  figcaption {
    margin-top: -10px;
    margin-left: -20px;
    width: 180px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input[type="radio"] {
    border: 0px;
    width: 30%;
    height: 1rem;
    accent-color: black;
  }
  label {
    margin-left: -10px;
  }
`;

const ImageCard = styled.div`
  background-color: white;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  width: 155px;
  .deleteIcon {
    position: relative;
    border-radius: 10px;
    height: 25px;
    width: 25px;
    padding: 3px;
    z-index: 55;
    left: 110px;
    top: -140px;
    background-color: white;
    bottom: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      filter: brightness(0.7);
      cursor: pointer;
    }
  }
`;

const AddPhoto = styled.div`
  position: relative;
  margin-top: 25px;
  margin-left: 55px;
  width: 500px;
  height: 220px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  border-radius: 5px;

  .add-photo-inner {
    width: 400px;
    height: 150px;
    border: 1px dashed grey;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    label {
      cursor: pointer;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;
