import { useCallback, memo } from "react";
import type { Emoji } from "@emoji-mart/data";
import {
  type EmojiCategoryList,
  type EmojiIconList,
  type GridRow,
  EmojiSettings,
} from "@platejs/emoji";
import {
  type EmojiDropdownMenuOptions,
  type UseEmojiPickerType,
  useEmojiDropdownMenuState,
} from "@platejs/emoji/react";
import { cn } from "@/lib/utils";

export function EmojiToolbarButton({
  options,
  ...props
}: {
  options?: EmojiDropdownMenuOptions;
} & React.ComponentPropsWithoutRef<"button">) {
  const { emojiPickerState, isOpen, setIsOpen } =
    useEmojiDropdownMenuState(options);

  return (
    <div className="relative inline-block">
      <button
        className={cn("p-2 rounded hover:bg-gray-200", isOpen && "bg-gray-300")}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        {...props}
        title="Emoji"
      >
        😊
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-80 rounded-xl border bg-white shadow-lg z-50">
          <EmojiPicker
            {...emojiPickerState}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            settings={options?.settings}
          />
        </div>
      )}
    </div>
  );
}

export function EmojiPicker({
  clearSearch,
  emoji,
  emojiLibrary,
  focusedCategory,
  hasFound,
  i18n,
  icons = {
    categories: emojiCategoryIcons,
    search: emojiSearchIcons,
  },
  isSearching,
  refs,
  searchResult,
  searchValue,
  setSearch,
  settings = EmojiSettings,
  visibleCategories,
  handleCategoryClick,
  onMouseOver,
  onSelectEmoji,
}: Omit<UseEmojiPickerType, "icons"> & {
  icons?: EmojiIconList<React.ReactElement>;
}) {
  return (
    <div className="flex flex-col rounded-xl bg-white text-black h-[23rem] w-80 border shadow-md">
      <EmojiPickerNavigation
        onClick={handleCategoryClick}
        emojiLibrary={emojiLibrary}
        focusedCategory={focusedCategory}
        i18n={i18n}
        icons={icons}
      />
      <EmojiPickerSearchBar
        i18n={i18n}
        searchValue={searchValue}
        setSearch={setSearch}
      >
        <EmojiPickerSearchAndClear
          clearSearch={clearSearch}
          i18n={i18n}
          searchValue={searchValue}
        />
      </EmojiPickerSearchBar>
      <EmojiPickerContent
        onMouseOver={onMouseOver}
        onSelectEmoji={onSelectEmoji}
        emojiLibrary={emojiLibrary}
        i18n={i18n}
        isSearching={isSearching}
        refs={refs}
        searchResult={searchResult}
        settings={settings}
        visibleCategories={visibleCategories}
      />
      <EmojiPickerPreview
        emoji={emoji}
        hasFound={hasFound}
        i18n={i18n}
        isSearching={isSearching}
      />
    </div>
  );
}

const EmojiButton = memo(function EmojiButton({
  emoji,
  index,
  onMouseOver,
  onSelect,
}: {
  emoji: Emoji;
  index: number;
  onMouseOver: (emoji?: Emoji) => void;
  onSelect: (emoji: Emoji) => void;
}) {
  return (
    <button
      className="group relative flex h-9 w-9 items-center justify-center rounded hover:bg-gray-200 text-2xl"
      onClick={() => onSelect(emoji)}
      onMouseEnter={() => onMouseOver(emoji)}
      onMouseLeave={() => onMouseOver()}
      aria-label={emoji.skins[0].native}
      data-index={index}
      tabIndex={-1}
      type="button"
    >
      <span
        className="relative"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
        }}
        data-emoji-set="native"
      >
        {emoji.skins[0].native}
      </span>
    </button>
  );
});

const RowOfButtons = memo(function RowOfButtons({
  emojiLibrary,
  row,
  onMouseOver,
  onSelectEmoji,
}: {
  row: GridRow;
} & Pick<
  UseEmojiPickerType,
  "emojiLibrary" | "onMouseOver" | "onSelectEmoji"
>) {
  return (
    <div key={row.id} className="flex" data-index={row.id}>
      {row.elements.map((emojiId, index) => (
        <EmojiButton
          key={emojiId}
          onMouseOver={onMouseOver}
          onSelect={onSelectEmoji}
          emoji={emojiLibrary.getEmoji(emojiId)}
          index={index}
        />
      ))}
    </div>
  );
});

function EmojiPickerContent({
  emojiLibrary,
  i18n,
  isSearching = false,
  refs,
  searchResult,
  settings = EmojiSettings,
  visibleCategories,
  onMouseOver,
  onSelectEmoji,
}: Pick<
  UseEmojiPickerType,
  | "emojiLibrary"
  | "i18n"
  | "isSearching"
  | "onMouseOver"
  | "onSelectEmoji"
  | "refs"
  | "searchResult"
  | "settings"
  | "visibleCategories"
>) {
  const getRowWidth = settings.perLine.value * settings.buttonSize.value;

  const isCategoryVisible = useCallback(
    (categoryId: EmojiCategoryList) => {
      return visibleCategories.has(categoryId)
        ? visibleCategories.get(categoryId)
        : false;
    },
    [visibleCategories]
  );

  const EmojiList = useCallback(() => {
    return emojiLibrary
      .getGrid()
      .sections()
      .map(({ id: categoryId }) => {
        const section = emojiLibrary.getGrid().section(categoryId);
        const { buttonSize } = settings;

        return (
          <div
            key={categoryId}
            ref={section.root}
            style={{ width: getRowWidth }}
            data-id={categoryId}
          >
            <div className="sticky -top-px bg-white p-1 py-2 text-sm font-semibold">
              {i18n.categories[categoryId]}
            </div>
            <div
              className="relative flex flex-wrap"
              style={{ height: section.getRows().length * buttonSize.value }}
            >
              {isCategoryVisible(categoryId) &&
                section
                  .getRows()
                  .map((row: GridRow) => (
                    <RowOfButtons
                      key={row.id}
                      onMouseOver={onMouseOver}
                      onSelectEmoji={onSelectEmoji}
                      emojiLibrary={emojiLibrary}
                      row={row}
                    />
                  ))}
            </div>
          </div>
        );
      });
  }, [
    emojiLibrary,
    getRowWidth,
    i18n.categories,
    isCategoryVisible,
    onSelectEmoji,
    onMouseOver,
    settings,
  ]);

  const SearchList = useCallback(() => {
    return (
      <div style={{ width: getRowWidth }} data-id="search">
        <div className="sticky -top-px bg-white p-1 py-2 text-sm font-semibold">
          {i18n.searchResult}
        </div>
        <div className="relative flex flex-wrap">
          {searchResult.map((emoji: Emoji, index: number) => (
            <EmojiButton
              key={emoji.id}
              onMouseOver={onMouseOver}
              onSelect={onSelectEmoji}
              emoji={emojiLibrary.getEmoji(emoji.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }, [
    emojiLibrary,
    getRowWidth,
    i18n.searchResult,
    searchResult,
    onSelectEmoji,
    onMouseOver,
  ]);

  return (
    <div
      ref={refs.current.contentRoot}
      className="h-full min-h-[50%] overflow-x-hidden overflow-y-auto px-2"
      data-id="scroll"
    >
      <div ref={refs.current.content} className="h-full">
        {isSearching ? SearchList() : EmojiList()}
      </div>
    </div>
  );
}

function EmojiPickerSearchBar({
  children,
  i18n,
  searchValue,
  setSearch,
}: {
  children: React.ReactNode;
} & Pick<UseEmojiPickerType, "i18n" | "searchValue" | "setSearch">) {
  return (
    <div className="flex items-center px-2">
      <div className="relative flex grow items-center">
        <input
          className="block w-full rounded-full border px-10 py-2 text-sm outline-none placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
          value={searchValue}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={i18n.search}
          aria-label="Search"
          autoComplete="off"
          type="text"
          autoFocus
        />
        {children}
      </div>
    </div>
  );
}

function EmojiPickerSearchAndClear({
  clearSearch,
  i18n,
  searchValue,
}: Pick<UseEmojiPickerType, "clearSearch" | "i18n" | "searchValue">) {
  return (
    <div className="absolute right-2">
      {searchValue && (
        <button
          onClick={clearSearch}
          title={i18n.clear}
          type="button"
          className="p-1 rounded-full hover:bg-gray-200"
        >
          ❌
        </button>
      )}
    </div>
  );
}

function EmojiPreview({ emoji }: Pick<UseEmojiPickerType, "emoji">) {
  return (
    <div className="flex h-14 items-center border-t p-2">
      <div className="flex items-center justify-center text-2xl">
        {emoji?.skins[0].native}
      </div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-semibold">{emoji?.name}</div>
        <div className="truncate text-sm">{`:${emoji?.id}:`}</div>
      </div>
    </div>
  );
}

function NoEmoji({ i18n }: Pick<UseEmojiPickerType, "i18n">) {
  return (
    <div className="flex h-14 items-center border-t p-2">
      <div className="flex items-center justify-center text-2xl">😢</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-bold">
          {i18n.searchNoResultsTitle}
        </div>
        <div className="truncate text-sm">{i18n.searchNoResultsSubtitle}</div>
      </div>
    </div>
  );
}

function PickAnEmoji({ i18n }: Pick<UseEmojiPickerType, "i18n">) {
  return (
    <div className="flex h-14 items-center border-t p-2">
      <div className="flex items-center justify-center text-2xl">☝️</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-semibold">{i18n.pick}</div>
      </div>
    </div>
  );
}

function EmojiPickerPreview({
  emoji,
  hasFound = true,
  i18n,
  isSearching = false,
  ...props
}: Pick<UseEmojiPickerType, "emoji" | "hasFound" | "i18n" | "isSearching">) {
  const showPickEmoji = !emoji && (!isSearching || hasFound);
  const showNoEmoji = isSearching && !hasFound;
  const showPreview = emoji && !showNoEmoji;

  return (
    <>
      {showPreview && <EmojiPreview emoji={emoji} {...props} />}
      {showPickEmoji && <PickAnEmoji i18n={i18n} {...props} />}
      {showNoEmoji && <NoEmoji i18n={i18n} {...props} />}
    </>
  );
}

function EmojiPickerNavigation({
  emojiLibrary,
  focusedCategory,
  i18n,
  icons,
  onClick,
}: {
  onClick: (id: EmojiCategoryList) => void;
} & Pick<
  UseEmojiPickerType,
  "emojiLibrary" | "focusedCategory" | "i18n" | "icons"
>) {
  return (
    <nav className="mb-2.5 border-b border-gray-300 p-1.5">
      <div className="flex justify-evenly">
        {emojiLibrary
          .getGrid()
          .sections()
          .map(({ id }) => (
            <button
              key={id}
              onClick={() => onClick(id)}
              title={i18n.categories[id]}
              type="button"
              className={cn(
                "p-1.5 rounded-full hover:bg-gray-200",
                id === focusedCategory && "bg-blue-200"
              )}
            >
              {icons.categories[id].outline || "★"}
            </button>
          ))}
      </div>
    </nav>
  );
}

const emojiCategoryIcons: Record<
  EmojiCategoryList,
  { outline: React.ReactElement; solid: React.ReactElement }
> = {
  activity: { outline: <span>⚽</span>, solid: <span>⚽</span> },
  custom: { outline: <span>⭐</span>, solid: <span>⭐</span> },
  flags: { outline: <span>🚩</span>, solid: <span>🚩</span> },
  foods: { outline: <span>🍎</span>, solid: <span>🍎</span> },
  frequent: { outline: <span>⏰</span>, solid: <span>⏰</span> },
  nature: { outline: <span>🍃</span>, solid: <span>🍃</span> },
  objects: { outline: <span>💡</span>, solid: <span>💡</span> },
  people: { outline: <span>😊</span>, solid: <span>😊</span> },
  places: { outline: <span>🧭</span>, solid: <span>🧭</span> },
  symbols: { outline: <span>🎵</span>, solid: <span>🎵</span> },
};

const emojiSearchIcons = {
  delete: <span>❌</span>,
  loupe: <span>🔍</span>,
};
