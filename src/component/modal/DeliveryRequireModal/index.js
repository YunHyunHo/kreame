import React, { useState } from "react";
import styled from "@emotion/styled";
import { Grid, Typography, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { TfiClose } from "react-icons/tfi";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  sizeAtom,
  modalOpenAtom,
  sizeStateAtom,
  tokenAtom,
  modalProductAtom,
  userAtom,
} from "../../../atoms/atom";

const DeliveryRequireModal = ({ product }) => {
  const [open, setOpen] = useRecoilState(modalOpenAtom);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const button = {
    color: "rgba(34, 34, 34, 0.3)",
    border: "1px solid #ebebeb",
    margin: "0",
    width: "636px",
    textAlign: "left",
    display: "block",
    marginTop: "12px",
    borderRadius: "10px",
  };

  const subtext = {
    fontSize: "14px",
    padding: "8px 4px",
  };

  const header = {
    borderTopRadius: "16px",
  };

  const text = {
    height: "60px",
    fontSize: "18px",
    fontWeight: 700,
    padding: "20px 50px",
    textAlign: "center",
  };

  const style = {
    borderRadius: "16px",
    bgcolor: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 480,
    boxShadow: 24,
  };

  return (
    <>
      <div>
        <Button sx={button} className="button" onClick={handleOpen}>
          <Typography sx={subtext}>배송 시 요청사항을 선택하세요</Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Box className="close_button">
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500],
                }}>
                <TfiClose size={24}></TfiClose>
              </IconButton>
            </Box>
            <Box sx={header} className="header">
              <Typography sx={text}>배송 요청 사항</Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 32px 32px",
                height: "412px",
              }}>
              {REQUIRE.map((item, id) => (
                <Typography
                  key={id}
                  sx={{ fontSize: "15px", padding: "17px 0" }}>
                  {item}
                </Typography>
              ))}
              <Stack direction="row" justifyContent="center" gap="8px" sx={{padding:"65px 0 32px"}}>
                <Button sx={{backgroundColor:"#fff", color:"rgba(34,34,34,.8)", border:"1px solid #d3d3d3", padding:"10px", borderRadius:"12px", width:"120px"}} onClick={handleClose}>취소</Button>
                <Button sx={{backgroundColor:"#222", color:"#fff", border:"1px solid #d3d3d3", padding:"10px", borderRadius:"12px", width:"120px", fontWeight:"700"}}>적용하기</Button>
              </Stack>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DeliveryRequireModal;

const REQUIRE = [
  "요청사항 없음",
  "문 앞에 놓아주세요",
  "경비실에 맡겨 주세요",
  "파손 위험 상품입니다. 배송 시 주의해주세요",
  "직접 입력",
];
