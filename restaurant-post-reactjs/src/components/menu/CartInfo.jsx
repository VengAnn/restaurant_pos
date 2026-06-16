import React, { useRef, useEffect } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItemNotes } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const scrolLRef = useRef();

  // Auto-scroll to the bottom of the cart list when new items are added
  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTop = scrolLRef.current.scrollHeight;
    }
  }, [cartData.length]);

  const handleAddNotes = (item) => {
    const notes = prompt(`Enter notes for ${item.name}:`, item.notes || "");
    if (notes !== null) {
      dispatch(updateItemNotes({ id: item.id, notes }));
    }
  };

  return (
    <div className="px-4 py-2 flex-1 flex flex-col min-h-0 bg-bg-secondary text-text-primary">
      <h1 className="text-lg text-text-primary font-bold tracking-wide">
        Order Details
      </h1>
      <div
        className="mt-4 overflow-y-auto scrollbar-hide flex-1 min-h-0 pb-4 flex flex-col"
        ref={scrolLRef}
      >
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-10 my-auto text-text-secondary">
            <p className="text-sm">Your cart is empty.</p>
            <p className="text-xs mt-1">Start adding items!</p>
          </div>
        ) : (
          cartData.map((item, idx) => {
            return (
              <div key={idx} className="bg-bg-card rounded-lg px-4 py-4 mb-2">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1 pr-2">
                    <h1 className="text-text-primary font-semibold tracking-wide text-sm truncate">
                      {item.name}
                    </h1>
                    {item.notes && (
                      <p className="text-xs text-yellow-500 mt-1 italic">
                        Note: {item.notes}
                      </p>
                    )}
                  </div>
                  <p className="text-text-secondary font-bold text-sm shrink-0">
                    x{item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-text-secondary cursor-pointer hover:text-red-500 transition-colors"
                      size={18}
                    />
                    <FaNotesMedical
                      onClick={() => handleAddNotes(item)}
                      className="text-text-secondary cursor-pointer hover:text-yellow-500 transition-colors"
                      size={18}
                    />
                  </div>
                  <p className="text-text-primary text-sm font-extrabold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
