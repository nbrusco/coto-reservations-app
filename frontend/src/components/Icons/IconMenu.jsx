import PropTypes from "prop-types";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";

export const IconsMenu = ({ icon, className }) => {
  switch (icon) {
    case "EDIT":
      return <EditIcon className={className} />;
    case "DELETE":
      return <DeleteIcon className={className} />;
    default:
      break;
  }
};

IconsMenu.propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
  };