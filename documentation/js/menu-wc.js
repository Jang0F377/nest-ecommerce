'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-ecommerce documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' : 'data-target="#xs-controllers-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' :
                                            'id="xs-controllers-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' : 'data-target="#xs-injectables-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' :
                                        'id="xs-injectables-links-module-AppModule-d722ebd02342ff7807571ee0efd0d3c0513fdbf3ef171d605ffc6a68b242fca9258881a91093a577e6e11d2d275e935cd68c9f7b2da0bbde2216a887e6ddfc87"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommonModule-dd40c0be5592cd85135faa98a7d65e25099ffe31ef53a6c17d36c8de866c7c483d05c80aa7be14cd031ccc43b1821edca5c86c7741621c318d550b4ed99dc9b5"' : 'data-target="#xs-injectables-links-module-CommonModule-dd40c0be5592cd85135faa98a7d65e25099ffe31ef53a6c17d36c8de866c7c483d05c80aa7be14cd031ccc43b1821edca5c86c7741621c318d550b4ed99dc9b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-dd40c0be5592cd85135faa98a7d65e25099ffe31ef53a6c17d36c8de866c7c483d05c80aa7be14cd031ccc43b1821edca5c86c7741621c318d550b4ed99dc9b5"' :
                                        'id="xs-injectables-links-module-CommonModule-dd40c0be5592cd85135faa98a7d65e25099ffe31ef53a6c17d36c8de866c7c483d05c80aa7be14cd031ccc43b1821edca5c86c7741621c318d550b4ed99dc9b5"' }>
                                        <li class="link">
                                            <a href="injectables/CRUDService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CRUDService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JWTService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JWTService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' : 'data-target="#xs-controllers-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' :
                                            'id="xs-controllers-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' : 'data-target="#xs-injectables-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' :
                                        'id="xs-injectables-links-module-ProductModule-9420bc7580ae2936e9e1f337e8695f5c331d2991e67d10cbba39d51f43d7f8d758a44a228fc4c4041b521c29db637627b55fbc638c60dea35e7e08eefcf61717"' }>
                                        <li class="link">
                                            <a href="injectables/AddToCartListener.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddToCartListener</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CRUDService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CRUDService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JWTService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JWTService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserManagementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagementService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShoppingCartModule.html" data-type="entity-link" >ShoppingCartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' : 'data-target="#xs-controllers-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' :
                                            'id="xs-controllers-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' }>
                                            <li class="link">
                                                <a href="controllers/ShoppingCartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingCartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' : 'data-target="#xs-injectables-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' :
                                        'id="xs-injectables-links-module-ShoppingCartModule-a06d883bf07dd42bc95ecaedd83ecdc592c9673aa489eedb3c2141024d4bfcd12adb24860b4cdd79cea717e1809a43e74f79ae2cdaf5a72975865ca76bd7566b"' }>
                                        <li class="link">
                                            <a href="injectables/CRUDService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CRUDService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShoppingCartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingCartService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserManagementModule.html" data-type="entity-link" >UserManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' : 'data-target="#xs-controllers-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' :
                                            'id="xs-controllers-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' }>
                                            <li class="link">
                                                <a href="controllers/UserManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' : 'data-target="#xs-injectables-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' :
                                        'id="xs-injectables-links-module-UserManagementModule-a7baa8a4cec3d3a5adcc2a78bb9def938704a79ebcd3161351da175fc87d0811552b6120588d7e19caf3af10a58ab76153acbb3cbb0f45407eeb474477b3ebf0"' }>
                                        <li class="link">
                                            <a href="injectables/CRUDService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CRUDService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JWTService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JWTService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserManagementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagementService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddToCartEvent.html" data-type="entity-link" >AddToCartEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CatchAllFilter.html" data-type="entity-link" >CatchAllFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Credentials.html" data-type="entity-link" >Credentials</a>
                            </li>
                            <li class="link">
                                <a href="classes/DomainError.html" data-type="entity-link" >DomainError</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidInputError.html" data-type="entity-link" >InvalidInputError</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidRequestError.html" data-type="entity-link" >InvalidRequestError</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotFoundError.html" data-type="entity-link" >NotFoundError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PartialProduct.html" data-type="entity-link" >PartialProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/PartialShoppingCart.html" data-type="entity-link" >PartialShoppingCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/PartialShoppingCartItem.html" data-type="entity-link" >PartialShoppingCartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/PartialUser.html" data-type="entity-link" >PartialUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDto.html" data-type="entity-link" >ProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCart.html" data-type="entity-link" >ShoppingCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartDto.html" data-type="entity-link" >ShoppingCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartItem.html" data-type="entity-link" >ShoppingCartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartItemDto.html" data-type="entity-link" >ShoppingCartItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthenticatedError.html" data-type="entity-link" >UnauthenticatedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedError.html" data-type="entity-link" >UnauthorizedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedFilter.html" data-type="entity-link" >UnauthorizedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserWithPassword.html" data-type="entity-link" >UserWithPassword</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserWithPasswordDto.html" data-type="entity-link" >UserWithPasswordDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddToCartListener.html" data-type="entity-link" >AddToCartListener</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RetryOptions.html" data-type="entity-link" >RetryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskStatus.html" data-type="entity-link" >TaskStatus</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});