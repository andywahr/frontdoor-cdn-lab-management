using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API
{
    public class ClaimsTransformer : Microsoft.AspNetCore.Authentication.IClaimsTransformation
    {
        public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var ci = ((ClaimsIdentity)principal.Identity);

            var cp = new ClaimsPrincipal(ci);

            return await Task.FromResult(cp);
        }
    }
}