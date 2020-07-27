import React, { useState } from 'react';

export async function copyToClipBoard(copyMe) {
  try {
    await navigator.clipboard.writeText(copyMe);
  } catch (err) {
    alert('Failed to copy!');
  }
}
