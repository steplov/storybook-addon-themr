const styles = {
  panel: {
    fontFamily: `
      -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto",
      "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif
    `,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
    padding: 16
  },
  leftColumn: {
    minWidth: 160,
    marginRight: 16
  },

  rightColumn: {
    fontSize: '0.875em',
    maxHeight: '80%',
    overflow: 'scroll'
  },

  select: {
    fontSize: '0.875em',
    width: '100%',
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: '3px',
    boxShadow: 'none',
    display: 'inline-flex',
    height: '2.25em',
    justifyContent: 'flex-start',
    lineHeight: '1.5',
    paddingBottom: 'calc(0.375em - 1px)',
    paddingLeft: 'calc(0.625em - 1px)',
    paddingRight: 'calc(0.625em - 1px)',
    paddingTop: 'calc(0.375em - 1px)',
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'white',
    borderColor: '#dbdbdb',
    color: '#363636',
    cursor: 'pointer',
    maxWidth: '100%',
    outline: 'none'
  }
};

export default styles;
