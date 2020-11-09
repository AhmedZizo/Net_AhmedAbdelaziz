using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Net_AhmedAbdelaziz.Controllers {
  [ApiController]
  [Route("[controller]")]
  public class BaseApiController : ControllerBase {
    private IMapper _mapper;

    protected IMapper Mediator => _mapper ?? (_mapper = HttpContext.RequestServices.GetService<IMapper>());
  }
}