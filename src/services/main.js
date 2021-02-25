import ApiService from "@/services/api";
import MixinsService from "@/services/mixins";
import ConfigService from "@/services/config";
import LibrariesService from "@/services/libs";

const MainService = {
  /**
   *
   */
  init() {
    ApiService.init();
    MixinsService.init();
    ConfigService.init();
    LibrariesService.init();
  }
};

export default MainService;
