import { Link } from "react-router-dom";


export default function Navbar() {
return (
<nav className="bg-blue-600 text-white p-4 flex gap-4">
<Link to="/products">Sản phẩm</Link>
<Link to="/customers">Khách hàng</Link>
<Link to="/orders">Đơn hàng</Link>
<Link to="/inventory">Nhập kho</Link>
<Link to="/search">Tìm kiếm</Link>
</nav>
);
}
``