import { DinnerDiningOutlined, RecyclingOutlined } from "@mui/icons-material";
import React from "react";

export default function OrderTypeIcon({type}) {
  if (type == "Recyclable") {
    return (
      <RecyclingOutlined />
    )
  }
  if (type == "Consumable") {
    return (
      <DinnerDiningOutlined />
    )
  }
  return;
}