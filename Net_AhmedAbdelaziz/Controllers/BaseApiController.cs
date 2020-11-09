using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Net_AhmedAbdelaziz.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class BaseApiController : ControllerBase {
    private IMapper _mapper;

    protected IMapper mapper => _mapper ?? (_mapper = HttpContext.RequestServices.GetService<IMapper>());
  }
}