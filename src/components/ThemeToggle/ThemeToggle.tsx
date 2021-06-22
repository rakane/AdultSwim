import './ThemeToggle.css';

type Props = {
  onChange: Function;
  checked: boolean;
};

const ThemeToggle = ({ onChange, checked }: Props) => {
  return (
    <div id="theme-toggle">
      <label className="toggle-label" htmlFor="darkMode">
        Dark Mode
      </label>
      <label className="switch">
        <input
          name="darkMode"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
