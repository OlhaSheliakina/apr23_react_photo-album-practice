import classNames from 'classnames';

export const TableBody = ({ photo }) => {
  return (
    <tr key={photo.id}>
      <td className="has-text-weight-bold">
        {photo.id}
      </td>

      <td>{photo.title}</td>
      <td>{photo.album.title}</td>

      <td className={classNames({
        'has-text-link': photo.user.sex === 'm',
        'has-text-danger': photo.user.sex === 'f',
      })}
      >
        {photo.user.name}
      </td>

      <td>
        <span>
          <button
            type="button"
            className="button mr-2 my-1 is-small"
          >
            &uarr;
          </button>

          <button
            type="button"
            className="button mr-2 my-1 is-small"
          >
            &darr;
          </button>
        </span>
      </td>
    </tr>
  );
};
