import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import partial from 'lodash/partial';
import Wordmark from '../../static/images/wordmark.svg';
import Pop from '../Pop';
import CurrentUser from './CurrentUser';
import LibraryPickerButton from './LibraryPickerButton';
import NewProjectButton from './NewProjectButton';
import ProjectsButton from './ProjectsButton';
import SnapshotButton from './SnapshotButton';
import TextSize from './TextSize';

function uiVariants({validationState, isUserTyping}) {
  if (validationState === 'passed') {
    return {popVariant: 'neutral'};
  }
  if (validationState === 'validating') {
    return {popVariant: 'thinking', modifier: 'top-bar_yellow'};
  }
  if (validationState === 'validation-error' && isUserTyping) {
    return {popVariant: 'thinking', modifier: 'top-bar_yellow'};
  }
  return {popVariant: 'horns', modifier: 'top-bar_red'};
}

export default function TopBar({
  currentProjectKey,
  currentUser,
  enabledLibraries,
  isHamburgerMenuActive,
  isUserAuthenticated,
  isUserTyping,
  isSnapshotInProgress,
  isTextSizeLarge,
  openMenu,
  projectKeys,
  validationState,
  onClickHamburgerMenu,
  onClickMenu,
  onCreateNewProject,
  onCreateSnapshot,
  onLibraryToggled,
  onLogOut,
  onStartLogIn,
  onToggleTextSize,
}) {
  const {popVariant, modifier} = uiVariants({validationState, isUserTyping});

  return (
    <div className={classnames('top-bar', modifier)}>
      <div
        className={classnames(
          'top-bar__hamburger',
          'u__icon',
          {'top-bar__hamburger_active': isHamburgerMenuActive},
        )}
        onClick={onClickHamburgerMenu}
      >
        &#xf0c9;
      </div>
      <div className="top-bar__logo-container">
        <Pop variant={popVariant} />
      </div>
      <div className="top-bar__wordmark-container">
        <Wordmark />
      </div>
      <div className="top-bar__spacer" />
      <NewProjectButton
        isUserAuthenticated={isUserAuthenticated}
        onClick={onCreateNewProject}
      />
      <ProjectsButton
        isOpen={openMenu === 'projectPicker'}
        projectKeys={projectKeys}
        onClick={partial(onClickMenu, 'projectPicker')}
      />
      <LibraryPickerButton
        enabledLibraries={enabledLibraries}
        isOpen={openMenu === 'libraryPicker'}
        onClick={partial(onClickMenu, 'libraryPicker')}
        onLibraryToggled={partial(onLibraryToggled, currentProjectKey)}
      />
      <SnapshotButton
        isInProgress={isSnapshotInProgress}
        onClick={onCreateSnapshot}
      />
      <TextSize isLarge={isTextSizeLarge} onToggle={onToggleTextSize} />
      <CurrentUser
        isOpen={openMenu === 'currentUser'}
        user={currentUser}
        onClick={partial(onClickMenu, 'currentUser')}
        onLogOut={onLogOut}
        onStartLogIn={onStartLogIn}
      />
    </div>
  );
}

TopBar.propTypes = {
  currentProjectKey: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  enabledLibraries: PropTypes.arrayOf(PropTypes.string).isRequired,
  isHamburgerMenuActive: PropTypes.bool.isRequired,
  isSnapshotInProgress: PropTypes.bool.isRequired,
  isTextSizeLarge: PropTypes.bool.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  isUserTyping: PropTypes.bool.isRequired,
  openMenu: PropTypes.string,
  projectKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  validationState: PropTypes.string.isRequired,
  onClickHamburgerMenu: PropTypes.func.isRequired,
  onClickMenu: PropTypes.func.isRequired,
  onCreateNewProject: PropTypes.func.isRequired,
  onCreateSnapshot: PropTypes.func.isRequired,
  onLibraryToggled: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onStartLogIn: PropTypes.func.isRequired,
  onToggleTextSize: PropTypes.func.isRequired,
};

TopBar.defaultProps = {
  currentProjectKey: null,
  openMenu: null,
};