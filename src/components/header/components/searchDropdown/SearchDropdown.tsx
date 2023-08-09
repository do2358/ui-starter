import React, { useEffect, useRef, useState } from 'react';
import { FilterIcon } from 'components/common/icons/FilterIcon';
import { SearchOverlay } from './searchOverlay/SearchOverlay/SearchOverlay';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { CategoryComponents } from '@app/components/header/components/HeaderSearch/HeaderSearch';
import { Btn, InputSearch } from '../HeaderSearch/HeaderSearch.styles';
import { useTranslation } from 'react-i18next';
import * as S from './SearchDropdown.styles';

interface SearchOverlayProps {
  query: string;
  setQuery: (query: string) => void;
  data: CategoryComponents[] | null;
  isOverlayOpen: boolean;
  setOverlayOpen: (state: boolean) => void;
}

export const SearchDropdown: React.FC<SearchOverlayProps> = ({
  query,
  setQuery,
  data,
  isOverlayOpen,
  setOverlayOpen,
}) => {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    setOverlayOpen(!!query || isFilterOpen);
  }, [query, isFilterOpen, setOverlayOpen]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  return (
    <>
      <S.Popover
        {...((!!data || isFilterOpen) && { trigger: 'click', onOpenChange: setOverlayOpen })}
        content={<SearchOverlay data={data} isFilterOpen={isFilterOpen} />}
        open={isOverlayOpen}
        getPopupContainer={() => ref.current}
      >
        <HeaderActionWrapper>
          <InputSearch
            width="100%"
            value={query}
            placeholder={t('header.search')}
            filter={
              <Btn
                size="small"
                ghost={isFilterOpen}
                type={isFilterOpen ? 'default' : 'text'}
                aria-label="Filter"
                icon={<FilterIcon />}
                onClick={() => setFilterOpen(!isFilterOpen)}
              />
            }
            onChange={(event) => setQuery(event.target.value)}
            enterButton={null}
            addonAfter={null}
          />
          <div ref={ref} />
        </HeaderActionWrapper>
      </S.Popover>
    </>
  );
};
