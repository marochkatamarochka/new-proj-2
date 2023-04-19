;(function(){
    const items = $('.menu-prod__item');
    const getItemWidth = (item) => {
      let resultWidth = 524;
    
    
      const windowWidth = $(window).width();
      const itemWidth = item.outerWidth(true);
    
      const isTablet = window.matchMedia('(max-width: 768px').matches;

      const isMobile = window.matchMedia('(max-width: 480px').matches;


      if (isTablet) {
        resultWidth = windowWidth - itemWidth * items.length;
      }
      if (isMobile) {
        resultWidth = windowWidth - itemWidth;
      }
    
      return resultWidth;
    }
    
    const setItemWith = (item, width) => {
      const itemContent = item.next();
      const itemText = itemContent.children();
     
    
      itemContent.width(width + 'px');
      if (width !== 0) {
      itemText.outerWidth(width + 'px');
      }
    }
    
    const closeItem = (item) => {
      const itemParent = item.parent();
      itemParent.removeClass('menu-prod__item--active');
      item.removeClass('menu-prod__button--active');
    
      setItemWith(item, 0);
    }
    
    const openItemVariant = (item) => {
      const itemParent = item.parent();
      itemParent.addClass("menu-prod__item--active");
      item.addClass("menu-prod__button--active");
    
      const width = getItemWidth(item);
    
    
      setItemWith(item, width);
    }
    
    $('.menu-prod__button').click(e => {
      e.preventDefault();
      
      const $this = $(e.currentTarget);
      const isActive = $this.hasClass('menu-prod__button--active');
      const activeElement = $('.menu-prod__button--active');
    
      if ($this.hasClass('menu-prod__button') && isActive) {
        if (activeElement) {
          closeItem(activeElement);
        }
      }
    
      if ($this.hasClass('menu-prod__button') && !isActive) {
        if (activeElement) {
          closeItem(activeElement);
        }
        openItemVariant($this);
      }
    });
  })();