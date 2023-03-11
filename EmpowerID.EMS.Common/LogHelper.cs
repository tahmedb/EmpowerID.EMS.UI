using Serilog;

namespace EmpowerID.EMS.Service.Repository
{
    public class LogHelper
    {
        public static void Error(Exception ex)
        {
            Log.Error(ex.Message);
        }

        public static void Error(string v, object ex)
        {
            Log.Error(v, ex);
        }
        public static void LogTrace(string message, params object[] args)
        {
            Log.Verbose(message, args);
        }
        public static void LogWarning(string message, params object[] args)
        {
            Log.Verbose(message, args);
        }
    }
}