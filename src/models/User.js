import Model from './Model';

class User extends Model {
  /**
   * Has Accepted Terms
   *
   * @returns {*}
   */
  HasAcceptedTerms() {
    return Boolean(this.get('accepted_terms', false));
  }

  /**
   * Has New Accepted Terms
   *
   * @returns {*}
   */
  HasAcceptedNewTerms() {
    return Boolean(this.get('read_new_terms', false));
  }

  /**
   * Get staff role
   *
   * @returns {*}
   */
  isStaff() {
    return Boolean(this.get('is_staff', false));
  }

  /**
   * Determine if profile is complete
   *
   * @returns {null|*}
   */
  isProfileComplete() {
    return Boolean(this.get('is_profile_complete', false));
  }

  /**
   * Get super admin role
   *
   * @returns {*}
   */
  isSuperAdmin() {
    return Boolean(this.get('is_superuser', false));
  }

  /**
   * Check if user has verified email
   *
   * @returns {boolean}
   */
  hasVerifiedEmail() {
    return Boolean(this.get('verified_email'));
  }

  /**
   * Check if user is system
   *
   * @returns {boolean}
   */
  isSystem() {
    return Boolean(this.get('is_system'));
  }

  /**
   * Check if user has enabled two factor
   *
   * @returns {boolean}
   */
  enabledTwoFactor() {
    return Boolean(this.get('two_factor_enabled'));
  }

  /**
   * Check if user is followable
   *
   * @returns {boolean}
   */
  IsFollowable() {
    return Boolean(this.get('followable'));
  }

  /**
   * Get profile picture url
   *
   * @returns {string|null}
   */
  getProfilePicture() {
    return this.get('photo');
  }

  /**
   * Check if active
   *
   * @returns {boolean}
   */
  isActive() {
    return Boolean(this.get('is_active'));
  }

  /**
   * Check if profile is complete
   *
   * @returns {*}
   */
  hasAccount() {
    return Boolean(this.get('has_account'));
  }

  /**
   * Check if profile is complete
   *
   * @returns {*}
   */
  accountHasBeConfigured() {
    return Boolean(this.get('account_has_be_configured'));
  }
}

export default User;
