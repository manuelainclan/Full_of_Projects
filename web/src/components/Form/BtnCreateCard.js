const BtnCreateCard = ({ handleClickCreateCard, value }) => {
  return (
    <button className="btn-large" onClick={handleClickCreateCard}>
      {value}
    </button>
  );
};

export default BtnCreateCard;
