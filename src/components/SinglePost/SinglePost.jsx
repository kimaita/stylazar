import "./singlepost.css";
import SideBar from "../../components/sidebar/SideBar";

export default function SinglePost() {
  return (
    <div className="singlepost">
      <div className="singlepostWrapper">
        <img
          src="https://images.pexels.com/photos/28926913/pexels-photo-28926913/free-photo-of-black-and-white-cat-relaxing-on-wooden-bench-in-istanbul.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="singlepostImg"
        />
        <h1 className="singlepostTitle">
          African Craddle: Future of Africa
          <div className="singlepostEdit">
            <i className="singlepostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlepostIcon fa-solid fa-delete-left"></i>
          </div>
        </h1>
          <p className="singlepostDescription">
          Lorem ipsum odor amet, consectetuer adipiscing elit.
          Blandit quam nostra rutrum primis lacinia sagittis vitae.
          Eleifend finibus magnis hac penatibus montes bibendum iaculis!
          In viverra varius quis primis senectus laoreet accumsan habitasse maximus.
          Mauris massa turpis porttitor pellentesque aliquet. Imperdiet ante
          condimentum bibendum; interdum pharetra sodales.
          Class lacus etiam tempor eleifend neque iaculis iaculis volutpat sapien.
          Curae tortor taciti metus mus mattis sodales vulputate conubia.

          Interdum fringilla gravida viverra et dictum vulputate? Nam eleifend
          ornare ridiculus varius volutpat congue. Tortor platea facilisi augue
          quis massa sollicitudin. Egestas ante lectus libero velit risus posuere.
          Eros posuere mattis bibendum malesuada justo porttitor mattis.
          Odio quisque dictumst vivamus torquent aliquet torquent ligula lorem?
          Efficitur convallis vehicula tristique rhoncus fermentum aliquet maximus?
          Bibendum eget per fusce suscipit mus class.

          Egestas ante lectus libero velit risus posuere.
          Eros posuere mattis bibendum malesuada justo porttitor mattis.
          Odio quisque dictumst vivamus torquent aliquet torquent ligula lorem?
          Efficitur convallis vehicula tristique rhoncus fermentum aliquet maximus?
          Bibendum eget per fusce suscipit mus class.

          Mauris massa turpis porttitor pellentesque aliquet. Imperdiet ante
          condimentum bibendum; interdum pharetra sodales.
          Class lacus etiam tempor eleifend neque iaculis iaculis volutpat sapien.
          Curae tortor taciti metus mus mattis sodales vulputate conubia.
          </p>
        <div className="singlepostInfor">
          <span className="singlepostAuthor">Author: <b>Georgina</b></span>
          <span className="singlepostDate">5 mins ago</span>
        </div>
      </div>
    </div>
  )
}
