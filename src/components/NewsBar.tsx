type NewsBarProps = {
    handleClick: () => void; 
};

const NewsBar: React.FC<NewsBarProps> = ({handleClick}) => {

  return (
    <div className="news-bar">
        <h3>Special offers for members and free delivery for over 20€ orders! Sign up now!</h3>
        <button className="close-button" onClick={handleClick}>x</button>
    </div>
  )
}
export default NewsBar