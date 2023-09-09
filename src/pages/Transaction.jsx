import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransactionHistory } from "../store/UserSlice";
import { useParams } from "react-router-dom";
import { HiPlus, HiMinus } from "react-icons/hi";
import moment from "moment/moment";

const Transaction = () => {
  const dispatch = useDispatch();
  const transactionHistory = useSelector((state) => state.user.transaction);
  const offset = useSelector((state) => state.user.offset);
  const limit = useSelector((state) => state.user.limit);
  useEffect(() => {
    dispatch(getTransactionHistory(offset, limit));
  }, [dispatch, offset, limit]);

  const handleShowMore = () => {
    // const offset = offset + limit;
    dispatch(getTransactionHistory(offset, limit));
  };

  return (
    <section className="flex flex-col mt-8">
      <h5 className="font-semibold">Semua Transaksi</h5>
      <div className="">
        {transactionHistory.map((item) => {
          const isTopUp = item.transaction_type === "TOPUP";
          const amountText = isTopUp
            ? `Rp.${item.total_amount}`
            : `Rp.${item.total_amount}`;

          return (
            <div className="w-full p-4 my-2 border rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                  {isTopUp ? (
                    <HiPlus className="text-2xl text-green-400" />
                  ) : (
                    <HiMinus className="text-2xl text-red-400" />
                  )}
                  <span
                    className={`text-base ${
                      isTopUp ? "text-green-400" : "text-red-400"
                    } font-bold`}
                  >
                    {amountText}
                  </span>
                </div>
                <div>
                  <span className="text-sm lowercase">
                    {item.transaction_type}
                  </span>
                </div>
              </div>
              <div>
                <span className="mt-2 ml-3 text-xs text-gray-400">
                  {moment(item.created_on).format("DD MMM YYYY, HH:mm")} WIB
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="my-4 font-semibold text-center text-red-500"
        onClick={handleShowMore}
      >
        Show more
      </button>
    </section>
  );
};

export default Transaction;
