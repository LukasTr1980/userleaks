# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.9.2] - 2024-08-24
### Fixed
- Removed error handling for failed DNS hostname lookup to avoid page crashing.

## [v1.9.1] - 2024-08-24
### Added
- Added a custom marker for Google Maps.
- Added a footer.
- Added Google Maps for displaying geolocation of IP addresses.

### Changed
- The values of `true` and `false` are now displayed with uppercase letters.
- "Not available" is now shown in gray to be less intrusive.

### Fixed
- Error handling if hostname is not available.

## [1.8.1] - 2024-08-20
### Fixed
- Fixed types by adding `JSX.Element`.

## [v1.8.0] - 2024-08-20
### Added
- Country flags have been added to the IP address page.
- Added some utility functions.

## [v1.7.0] - 2024-08-20
### Added
- Added the ability to check for proxy, VPN, or Tor node on the IP address page.

## [v1.6.0] - 2024-08-19
### Added
- Added same behaviour to ipaddress page.
- Added `error.tsx` for error handling.
- Added `loading.tsx` for handling loading states.
- Implemented a loading timeout mechanism if loading takes too long.

### Changed
- Optimized the loading process to load individual rows instead of the entire page.
- Refactored code for the IP address page and canvas page with constants.
- Created logo with a transparent background.
- Further improvements to design.
- Renamed `geoip` to `ipData` to reflect broader data usage.
- Updated Winston logger to use the local timezone.

## [v1.5.0] - 2024-08-18
### Added
- Added logo Userleaks.
- Improved links for mobile usability.
- Added current path display feature.
- Redesigned layout for better user experience.
- Added more traits on the IP address page.

## [v1.4.0] - 2024-08-17
### Added
- Sidebar for mobile view.
- Updated colors and performed a complete redesign of the layout.

## [v1.3.0] - 2024-08-17 
### Added
- Logging and `devIp` to test MaxMind functionality in the development environment.
- Added `locationaccuracy`, `domain`, and `connectiontype`.

### Removed
- Removed `font-size: 14px` in `globals.css`.

### Changed
- Layout changes.

## [v1.2.0] - 2024-08-17
### Added
- Integrated MaxMind GeoIP location service for enhanced IP geolocation functionality.

## [v1.1.0] - 2024-08-17
### Added
- Winston logger implemented for server-side logging.
- Added hostname retrieval functionality for IP address lookup.

## [v1.0.0] - 2024-08-16
### Added
- Initial release with IP address detection and Canvas Fingerprinting.
