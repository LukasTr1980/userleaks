# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 
### Changed
Exported rendertablerows from page.tsx in ipaddress, moved determineRIR function to another place.

### Removed
- Removed zustand Store from canvas page and components.

## [v1.11.5] - 2024-09-01
### Changed
- Removed winston and replaced with console.

## [v1.11.4] - 2024-09-01
### Changed
- Changed Ratelimiting from redis to memory.

## [v1.11.3] - 2024-08-31
### Added
- Ratelimiting for api routes.

## [v1.11.2] - 2024-08-31
### Fixed
- Extraction of abuse contact mail for all RIRs.

## [v1.11.1] - 2024-08-31
### Changed
- Changed error timeout to 10 seconds.

## [v1.11.0] - 2024-08-31
### Added
- Implementation of RIR lookup.
### Changed
- Added to country and continent the full names.

## [v1.10.2] - 2024-08-25
### Changed
- Extended RIPE data.

## [v1.10.1] - 2024-08-25
### Changed
- Extended RIPE data.

## [v1.10.0] - 2024-08-25
### Added
- Added Ripedata to ipaddress page.

### Changed
- Now vpn, proxy or tor return false or true.
- Improved error and loading handling.

## [v1.9.4] - 2024-08-24
### Added
- Integrated sharp for faster image optimization in production.

### Changed
- Updated all dependencies for improved security.

## [v1.9.3] - 2024-08-24
### Fixed
- Fixing crash.

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
