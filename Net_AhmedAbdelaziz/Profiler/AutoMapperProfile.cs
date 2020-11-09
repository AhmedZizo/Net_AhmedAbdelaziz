using AutoMapper;
using Net_AhmedAbdelaziz.Dto;
using Net_AhmedAbdelaziz.Entities;

namespace Net_AhmedAbdelaziz.Profiler {
  public class AutoMapperProfile :Profile{
    public AutoMapperProfile() {

      CreateMap<User, UserDto>().ReverseMap();
      CreateMap<User, ModifyUserDto>()
        .ForMember(x=>x.Password,cfg=>cfg.Ignore())
        .ReverseMap()
        .ForMember(x=>x.PasswordHash,cfg=>cfg.Ignore())
        ;

    }
  }
}