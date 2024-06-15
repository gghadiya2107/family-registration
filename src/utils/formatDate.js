const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 because January is 0) and pad with leading zero if necessary
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  export default  formatDate