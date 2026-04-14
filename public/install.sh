#!/bin/bash

set -e

# ─────────────────────────────────────────
# Colors
# ─────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ─────────────────────────────────────────
# OS Check
# ─────────────────────────────────────────
detect_os() {
    case "$(uname -s)" in
        Darwin)       error "macOS is not supported." ;;
        MINGW*|CYGWIN*|MSYS*) error "Windows is not supported." ;;
        Linux)        info "Linux detected." ;;
        *)            error "Unknown operating system. Aborting." ;;
    esac
}

# ─────────────────────────────────────────
# Package Manager Detection
# ─────────────────────────────────────────
detect_pkg_manager() {
    if command -v pacman &>/dev/null;         then PKG="pacman";   INSTALL="sudo pacman -S --noconfirm"
    elif command -v apt &>/dev/null;          then PKG="apt";      INSTALL="sudo apt install -y"
    elif command -v dnf &>/dev/null;          then PKG="dnf";      INSTALL="sudo dnf install -y"
    elif command -v yum &>/dev/null;          then PKG="yum";      INSTALL="sudo yum install -y"
    elif command -v zypper &>/dev/null;       then PKG="zypper";   INSTALL="sudo zypper install -y"
    elif command -v apk &>/dev/null;          then PKG="apk";      INSTALL="sudo apk add"
    elif command -v emerge &>/dev/null;       then PKG="emerge";   INSTALL="sudo emerge"
    elif command -v nix-env &>/dev/null;      then PKG="nix-env";  INSTALL="nix-env -iA nixpkgs"
    elif command -v xbps-install &>/dev/null; then PKG="xbps";     INSTALL="sudo xbps-install -y"
    elif command -v slackpkg &>/dev/null;     then PKG="slackpkg"; INSTALL="sudo slackpkg install"
    else error "No supported package manager found."
    fi
    info "Package manager: $PKG"
}

# ─────────────────────────────────────────
# Install package if not present
# ─────────────────────────────────────────
ensure() {
    local cmd=$1
    local pkg=${2:-$1}
    if ! command -v "$cmd" &>/dev/null; then
        info "Installing $pkg..."
        $INSTALL "$pkg"
        success "$pkg installed."
    else
        success "$cmd already installed. Skipping."
    fi
}

# ─────────────────────────────────────────
# Handle existing Neovim config
# ─────────────────────────────────────────
handle_nvim_config() {
    local config="$HOME/.config/nvim"
    if [ -d "$config" ]; then
        warn "Existing Neovim config found at $config"
        echo "  [1] Backup and replace"
        echo "  [2] Abort"
        read -rp "Choice [1/2]: " choice
        case "$choice" in
            1)
                local backup="${config}.bak.$(date +%Y%m%d%H%M%S)"
                mv "$config" "$backup"
                success "Backup created at $backup"
                ;;
            2) error "Aborted by user." ;;
            *) error "Invalid choice." ;;
        esac
    fi
}

# ─────────────────────────────────────────
# Handle existing dotfiles
# ─────────────────────────────────────────
handle_dotfiles() {
    local dotfiles="$HOME/dotfiles"
    if [ -d "$dotfiles" ]; then
        warn "Existing dotfiles found at $dotfiles"
        echo "  [1] Backup and replace"
        echo "  [2] Abort"
        read -rp "Choice [1/2]: " choice
        case "$choice" in
            1)
                local backup="${dotfiles}.bak.$(date +%Y%m%d%H%M%S)"
                mv "$dotfiles" "$backup"
                success "Backup created at $backup"
                ;;
            2) error "Aborted by user." ;;
            *) error "Invalid choice." ;;
        esac
    fi
}

# ─────────────────────────────────────────
# Main
# ─────────────────────────────────────────
main() {
    echo ""
    echo -e "${BLUE}╔══════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║         brendo.dev  installer        ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════╝${NC}"
    echo ""

    detect_os
    detect_pkg_manager

    # Core dependencies
    ensure git
    ensure nvim neovim
    ensure lua
    ensure python3
    ensure gcc
    ensure rg ripgrep
    ensure fd
    ensure node nodejs
    ensure npm
    ensure stow

    # pynvim
    info "Installing pynvim..."
    pip3 install pynvim --break-system-packages 2>/dev/null || pip3 install pynvim
    success "pynvim installed."

    # Gemini CLI
    if ! command -v gemini &>/dev/null; then
        info "Installing gemini-cli..."
        npm install -g @google/gemini-cli
        success "gemini-cli installed."
    else
        success "gemini-cli already installed. Skipping."
    fi

    # Dotfiles
    handle_dotfiles
    info "Cloning dotfiles..."
    git clone https://github.com/brdneo/dotfiles.git "$HOME/dotfiles"
    cd "$HOME/dotfiles"
    stow alacritty bash git
    success "Dotfiles applied."

    # Neovim config
    handle_nvim_config
    info "Cloning nvim config..."
    git clone https://github.com/brdneo/nvim.git "$HOME/.config/nvim"
    success "Nvim config cloned."

    echo ""
    success "Installation complete."
    echo ""
    info "Next steps:"
    echo "  1. Run 'nvim' — Lazy.nvim will install plugins automatically"
    echo "  2. Run 'gemini auth login' — authenticate with your Google account"
    echo "  3. Add your secret keys to ~/.env.secret"
    echo ""
}

main
