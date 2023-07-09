import { TableBody } from '../TableBody/TableBody';

export const Table = ({ photos }) => {
  return (
    <table
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID

              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Photo name

              <a href="#/">
                <span className="icon">
                  <i className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Album name

              <a href="#/">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User name

              <a href="#/">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Order

              <a href="#/">
                <span className="icon" />
              </a>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {photos.map(photo => (
          <TableBody key={photo.id} photo={photo} />
        ))}
      </tbody>
    </table>
  );
};
